import { Module } from '@nestjs/common';
import { ScanCommand } from './commands/scan';

@Module({
  controllers: [],
  providers: [ScanCommand],
  exports: [],
})
export class CliModule {}
