import { Module } from '@nestjs/common';
import { DocTrackerLogger } from './logger';
import { WINSTON_LOGGER } from './config';

@Module({
  providers: [
    { provide: 'LOGGER', useValue: WINSTON_LOGGER },
    DocTrackerLogger,
  ],
  exports: [DocTrackerLogger],
})
export class LoggerModule {}
