import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Report } from '../../domain';
import { CollectorService } from './collector.service';
import { CollectCommand } from './command';

@CommandHandler(CollectCommand)
export class CollectCommandHandler
  implements ICommandHandler<CollectCommand, Report>
{
  constructor(private readonly collector: CollectorService) {}

  async execute(command: CollectCommand): Promise<Report> {
    const report = await this.collector.collect(command.options);
    return report;
  }
}
