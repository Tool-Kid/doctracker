import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { DocTrackerConfig } from './doctracker-config';

export class Validator {
  public validateConfig(config: DocTrackerConfig) {
    const serializedConfig = plainToInstance(DocTrackerConfig, config);
    const errors = validateSync(serializedConfig, {
      forbidNonWhitelisted: true,
    });
    if (errors.length) {
      throw new Error(`Validation failed: ${errors}`);
    }
  }
}
