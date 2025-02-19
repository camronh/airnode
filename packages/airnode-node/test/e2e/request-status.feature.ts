import { ethers } from 'ethers';
import { encode } from '@api3/airnode-abi';
import { startCoordinator } from '../../src/workers/local-handlers';
import { operation } from '../fixtures';
import { RequestErrorMessage } from '../../src/types';
import { deployAirnodeAndMakeRequests, fetchAllLogs, increaseTestTimeout } from '../setup/e2e';

it('sets the correct status code for both successful and failed requests', async () => {
  increaseTestTimeout();

  const baseParameters = [
    { type: 'bytes32', name: 'to', value: 'USD' },
    { type: 'bytes32', name: '_type', value: 'int256' },
    { type: 'bytes32', name: '_path', value: 'result' },
    { type: 'bytes32', name: '_times', value: '1000000' },
  ];
  // Returns a 404
  const invalidParameters = [...baseParameters, { type: 'bytes32', name: 'from', value: 'UNKNOWN_COIN' }];
  const validParameters = [...baseParameters, { type: 'bytes32', name: 'from', value: 'ETH' }];
  const requests = [
    operation.buildFullRequest({ parameters: invalidParameters }),
    operation.buildFullRequest({ parameters: validParameters }),
  ];
  const { provider, deployment } = await deployAirnodeAndMakeRequests(__filename, requests);

  await startCoordinator();

  const logs = await fetchAllLogs(provider, deployment.contracts.AirnodeRrp);

  // We need to use the encoded parameters to find out which request is which
  const encodedValidParams = encode(validParameters);
  const validRequest = logs.find((log) => log.args.parameters === encodedValidParams);
  const validFulfillment = logs.find(
    (log) => log.args.requestId === validRequest!.args.requestId && log.name === 'FulfilledRequest'
  );
  // The API responds with 723.392028 which multipled by the _times parameter
  const validResponseValue = ethers.BigNumber.from(validFulfillment!.args.data).toString();
  expect(validResponseValue).toEqual('723392028');

  const encodedInvalidParams = encode(invalidParameters);
  const invalidRequest = logs.find((log) => log.args.parameters === encodedInvalidParams);
  const failedRequest = logs.find(
    (log) => log.args.requestId === invalidRequest!.args.requestId && log.name === 'FailedRequest'
  );
  // The error message will contain the API error message
  expect(failedRequest!.args.errorMessage).toEqual(
    `${RequestErrorMessage.ApiCallFailed} with error: Request failed with status code 404`
  );
});
