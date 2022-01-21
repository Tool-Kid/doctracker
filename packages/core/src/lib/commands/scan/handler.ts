import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReportCommand } from '../report';
import { Report } from '../../domain';
import { CollectCommand } from '../collect';
import { ScanCommand } from './command';

@CommandHandler(ScanCommand)
export class ScanCommandHandler implements ICommandHandler<ScanCommand, void> {
  constructor(private readonly bus: CommandBus) {}

  async execute(command: ScanCommand): Promise<void> {
    const { git, options } = command;
    const collectCommand = new CollectCommand(git);
    const report = await this.bus.execute<CollectCommand, Report>(
      collectCommand
    );
    if (!options.report) {
      return;
    }
    const reportCommand = new ReportCommand(report);
    await this.bus.execute(reportCommand);
  }
}
