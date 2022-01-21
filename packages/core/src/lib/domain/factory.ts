import { FactoryProvider } from '@nestjs/common';
import * as path from 'path';
import { DocTrackerConfig, Validator } from '../config';
import { DocTrackerLogger } from '../logger';
import { readJSONFile } from '../utils/fs';
import { DocTracker } from './doctracker';

export const DOCTRACKER_FACTORY_PROVIDER: FactoryProvider = {
  provide: DocTracker,
  useFactory: async (logger: DocTrackerLogger) => {
    const sourceRoot = path.join(process.cwd());
    const configPath = path.join(sourceRoot, 'doctracker.config.json');

    logger.log('info', `⌛ Reading configuration file from ${configPath}`);

    let configFile;
    try {
      configFile = {
        ...readJSONFile(configPath),
        sourceRoot,
        configPath,
      } as DocTrackerConfig;
      logger.log('info', `✅ Configuration loaded successfully!`);
    } catch (error) {
      throw new Error(`❌ No configuration file found at ${configPath}`);
    }

    const validator = new Validator();
    validator.validateConfig(configFile);

    const doctracker = new DocTracker(configFile);
    return doctracker;
  },
  inject: [DocTrackerLogger],
};
