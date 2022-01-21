import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReportCommand } from './command';
import { ReporterService } from './reporter.service';

@CommandHandler(ReportCommand)
export class ReportCommandHandler
  implements ICommandHandler<ReportCommand, void>
{
  constructor(private readonly reporter: ReporterService) {}

  async execute(command: ReportCommand): Promise<void> {
    await this.reporter.report(command.report);
  }
}
