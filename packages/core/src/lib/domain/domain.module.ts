import { Module } from '@nestjs/common';
import { GitService } from '.';
import { LoggerModule } from '../logger';
import { DocTracker } from './doctracker';
import { DOCTRACKER_FACTORY_PROVIDER } from './factory';

@Module({
  imports: [LoggerModule],
  providers: [DOCTRACKER_FACTORY_PROVIDER, GitService],
  exports: [DocTracker, GitService],
})
export class DomainModule {}
