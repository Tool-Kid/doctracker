import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DomainModule } from '../domain';
import { CollectCommandHandler, CollectorService } from './collect';
import { ReportCommandHandler } from './report';
import { ReporterService } from './report';
import { ScanCommandHandler, ScannerService } from './scan';

const COMMAND_HANDLERS = [
  ScanCommandHandler,
  CollectCommandHandler,
  ReportCommandHandler,
];

const COMMAND_SERVICES = [ScannerService, CollectorService, ReporterService];

@Module({
  imports: [CqrsModule, DomainModule],
  providers: [...COMMAND_HANDLERS, ...COMMAND_SERVICES],
})
export class CommandsModule {}
