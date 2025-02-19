/* globals context */
const hre = require('hardhat');
const { expect } = require('chai');
const testUtils = require('../../test-utils');

let roles;
let rrpRequester, airnodeRrp;
let airnodeAddress, airnodeMnemonic, airnodeXpub, airnodeWallet;
let sponsorWalletAddress;

beforeEach(async () => {
  const accounts = await hre.ethers.getSigners();
  roles = {
    deployer: accounts[0],
    sponsor: accounts[1],
    randomPerson: accounts[9],
  };
  const airnodeRrpFactory = await hre.ethers.getContractFactory('AirnodeRrp', roles.deployer);
  airnodeRrp = await airnodeRrpFactory.deploy();
  const rrpRequesterFactory = await hre.ethers.getContractFactory('MockRrpRequester', roles.deployer);
  rrpRequester = await rrpRequesterFactory.deploy(airnodeRrp.address);
  ({ airnodeAddress, airnodeMnemonic, airnodeXpub } = testUtils.generateRandomAirnodeWallet());
  airnodeWallet = hre.ethers.Wallet.fromMnemonic(airnodeMnemonic, "m/44'/60'/0'/0/0");
  sponsorWalletAddress = testUtils.deriveSponsorWalletAddress(airnodeXpub, roles.sponsor.address);
  await roles.deployer.sendTransaction({
    to: airnodeAddress,
    value: hre.ethers.utils.parseEther('1'),
  });
  await roles.deployer.sendTransaction({
    to: sponsorWalletAddress,
    value: hre.ethers.utils.parseEther('1'),
  });
});

describe('constructor', function () {
  it('sets AirnodeRrp', async function () {
    expect(await rrpRequester.airnodeRrp()).to.equal(airnodeRrp.address);
  });
  it('sponsors itself', async function () {
    expect(await airnodeRrp.sponsorToRequesterToSponsorshipStatus(rrpRequester.address, rrpRequester.address)).to.equal(
      true
    );
  });
});

describe('onlyAirnodeRrp', function () {
  context('Sender AirnodeRrp', function () {
    it('does not revert', async function () {
      await airnodeRrp.connect(roles.sponsor).setSponsorshipStatus(rrpRequester.address, true);
      const endpointId = testUtils.generateRandomBytes32();
      const parameters = testUtils.generateRandomBytes();
      await airnodeRrp.connect(roles.randomPerson).createTemplate(airnodeAddress, endpointId, parameters);
      const templateId = hre.ethers.utils.keccak256(
        hre.ethers.utils.solidityPack(['address', 'bytes32', 'bytes'], [airnodeAddress, endpointId, parameters])
      );
      // Make the request
      const requestTimeParameters = testUtils.generateRandomBytes();
      await rrpRequester
        .connect(roles.randomPerson)
        .makeTemplateRequest(
          templateId,
          roles.sponsor.address,
          sponsorWalletAddress,
          rrpRequester.address,
          rrpRequester.interface.getSighash('fulfill'),
          requestTimeParameters,
          { gasLimit: 500000 }
        );
      const requestId = hre.ethers.utils.keccak256(
        hre.ethers.utils.solidityPack(
          ['uint256', 'address', 'address', 'uint256', 'bytes32', 'address', 'address', 'address', 'bytes4', 'bytes'],
          [
            (await hre.ethers.provider.getNetwork()).chainId,
            airnodeRrp.address,
            rrpRequester.address,
            (await airnodeRrp.requesterToRequestCountPlusOne(rrpRequester.address)).sub(1),
            templateId,
            roles.sponsor.address,
            sponsorWalletAddress,
            rrpRequester.address,
            rrpRequester.interface.getSighash('fulfill'),
            requestTimeParameters,
          ]
        )
      );
      // Fulfill the request by making sure the sender is airnodeRrp
      const sponsorWallet = testUtils
        .deriveSponsorWallet(airnodeMnemonic, roles.sponsor.address)
        .connect(hre.ethers.provider);
      const fulfillData = hre.ethers.utils.keccak256(
        hre.ethers.utils.solidityPack(['uint256', 'string'], ['123456', 'hello'])
      );
      const signature = await airnodeWallet.signMessage(
        hre.ethers.utils.arrayify(
          hre.ethers.utils.keccak256(hre.ethers.utils.solidityPack(['bytes32', 'bytes'], [requestId, fulfillData]))
        )
      );
      // Since `onlyAirnodeRrp` is a part of the external call, the transaction that
      // the Airnode made to AirnodeRrp will not revert. This means that we should
      // not check if the transaction reverts here, but rather the returned success value.
      const staticCallResult = await airnodeRrp
        .connect(sponsorWallet)
        .callStatic.fulfill(
          requestId,
          airnodeAddress,
          rrpRequester.address,
          rrpRequester.interface.getSighash('fulfill'),
          fulfillData,
          signature,
          { gasLimit: 500000 }
        );
      expect(staticCallResult.callSuccess).to.equal(true);
    });
  });
  context('Sender not AirnodeRrp', function () {
    it('reverts', async function () {
      await expect(
        rrpRequester.connect(roles.randomPerson).fulfill(hre.ethers.constants.HashZero, '0x')
      ).to.be.revertedWith('Sender not Airnode RRP');
    });
  });
});
