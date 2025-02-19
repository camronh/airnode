import { Config } from '@api3/airnode-node';
import { validateJsonWithTemplate } from '@api3/airnode-validator';
import * as logger from '../utils/logger';

export function validateConfig(config: Config, nodeVersion: string, skipVersionCheck: boolean) {
  if (!skipVersionCheck && nodeVersion !== config.nodeSettings.nodeVersion) {
    logger.fail(
      `nodeVersion under nodeSettings in config.json is ${config.nodeSettings.nodeVersion} while the deployer node version is ${nodeVersion}`
    );
    throw new Error("Node version specified in config.json does not match the deployer's version");
  }

  if (config.nodeSettings.cloudProvider.type === 'local') {
    const message = "Deployer can't deploy to 'local' cloud provider";
    logger.fail(message);
    throw new Error(message);
  }
}

export function validateReceipt(supposedReceipt: any) {
  // TODO: Validate receipt version https://api3dao.atlassian.net/browse/AN-423
  return validateJsonWithTemplate(supposedReceipt, 'receipt');
}
