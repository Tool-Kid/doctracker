import { Inject, Injectable } from '@nestjs/common';
import { LogLevels, WINSTON_LOGGER } from './config';
import { Logger } from 'winston';

@Injectable()
export class DocTrackerLogger {
  constructor(@Inject('LOGGER') private readonly logger: Logger) {}

  public log(level: LogLevels, message: string) {
    this.logger.log(level, message);
  }
}

export const LOGGER = new DocTrackerLogger(WINSTON_LOGGER);
