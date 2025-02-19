/* globals context */

const hre = require('hardhat');
const { expect } = require('chai');
const testUtils = require('../test-utils');

let roles;
let airnodeRrp;

beforeEach(async () => {
  const accounts = await hre.ethers.getSigners();
  roles = {
    deployer: accounts[0],
    randomPerson: accounts[9],
  };
  const airnodeRrpFactory = await hre.ethers.getContractFactory('AirnodeRrp', roles.deployer);
  airnodeRrp = await airnodeRrpFactory.deploy();
});

describe('createTemplate', function () {
  context('Airnode address not zero', function () {
    it('creates template', async function () {
      const airnode = testUtils.generateRandomAddress();
      const endpointId = testUtils.generateRandomBytes32();
      const parameters = testUtils.generateRandomBytes();
      const templateId = hre.ethers.utils.keccak256(
        hre.ethers.utils.solidityPack(['address', 'bytes32', 'bytes'], [airnode, endpointId, parameters])
      );
      const templateBeforeCreation = await airnodeRrp.templates(templateId);
      expect(templateBeforeCreation.airnode).to.equal(hre.ethers.constants.AddressZero);
      expect(templateBeforeCreation.endpointId).to.equal(hre.ethers.constants.HashZero);
      expect(templateBeforeCreation.parameters).to.equal('0x');
      await expect(airnodeRrp.connect(roles.randomPerson).createTemplate(airnode, endpointId, parameters))
        .to.emit(airnodeRrp, 'CreatedTemplate')
        .withArgs(templateId, airnode, endpointId, parameters);
      const templateAfterCreation = await airnodeRrp.templates(templateId);
      expect(templateAfterCreation.airnode).to.equal(airnode);
      expect(templateAfterCreation.endpointId).to.equal(endpointId);
      expect(templateAfterCreation.parameters).to.equal(parameters);
    });
  });
  context('Airnode address zero', function () {
    it('reverts', async function () {
      const airnode = hre.ethers.constants.AddressZero;
      const endpointId = testUtils.generateRandomBytes32();
      const parameters = testUtils.generateRandomBytes();
      const templateId = hre.ethers.utils.keccak256(
        hre.ethers.utils.solidityPack(['address', 'bytes32', 'bytes'], [airnode, endpointId, parameters])
      );
      const templateBeforeCreation = await airnodeRrp.templates(templateId);
      expect(templateBeforeCreation.airnode).to.equal(hre.ethers.constants.AddressZero);
      expect(templateBeforeCreation.endpointId).to.equal(hre.ethers.constants.HashZero);
      expect(templateBeforeCreation.parameters).to.equal('0x');
      await expect(
        airnodeRrp.connect(roles.randomPerson).createTemplate(airnode, endpointId, parameters)
      ).to.be.revertedWith('Airnode address zero');
    });
  });
});

describe('getTemplates', function () {
  it('gets templates', async function () {
    // Create the templates
    const noTemplates = 10;
    const airnodes = Array.from({ length: noTemplates }, () => testUtils.generateRandomAddress());
    const endpointIds = Array.from({ length: noTemplates }, () => testUtils.generateRandomBytes32());
    const parameters = Array.from({ length: noTemplates }, () => testUtils.generateRandomBytes32());
    const templateIds = [];
    for (let i = 0; i < noTemplates; i++) {
      await airnodeRrp.createTemplate(airnodes[i], endpointIds[i], parameters[i]);
      templateIds.push(
        hre.ethers.utils.keccak256(
          hre.ethers.utils.solidityPack(['address', 'bytes32', 'bytes'], [airnodes[i], endpointIds[i], parameters[i]])
        )
      );
    }
    // Get the templates and verify them
    const templates = await airnodeRrp.getTemplates(templateIds);
    expect(templates.airnodes.length).to.equal(noTemplates);
    expect(templates.endpointIds.length).to.equal(noTemplates);
    expect(templates.parameters.length).to.equal(noTemplates);
    for (let i = 0; i < noTemplates; i++) {
      expect(templates.airnodes[i]).to.equal(airnodes[i]);
      expect(templates.endpointIds[i]).to.equal(endpointIds[i]);
      expect(templates.parameters[i]).to.equal(parameters[i]);
    }
  });
});
