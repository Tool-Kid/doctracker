import { Module } from '@nestjs/common';
import { CommandsModule } from './commands';
import { CommonModule } from './common';

@Module({
  imports: [CommonModule, CommandsModule],
})
export class DocTrackerCoreModule {}
