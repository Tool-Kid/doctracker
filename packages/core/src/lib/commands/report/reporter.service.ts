import { Injectable } from '@nestjs/common';
import { Channel, ChannelOptions, DocTracker, Report } from '../../domain';
import { LOGGER } from '../../logger';
import { FormatterFactory } from './formatter';

@Injectable()
export class ReporterService {
  constructor(private readonly doctracker: DocTracker) {}

  public async report(report: Report) {
    if (!report.trackerReports.length) {
      LOGGER.log('info', `✅ All sync! No changes to report! ✨`);
      return;
    }
    for (const trackerReport of report.trackerReports) {
      const channel = this.getChannelById(trackerReport.channelId);
      if (!channel) {
        continue;
      }
      const factory = new FormatterFactory();
      const formatter = factory.build(channel.options.format);
      const messages = formatter.format(report);
      for (const message of messages) {
        await channel.publish(message);
      }
    }
  }

  private getChannelById(
    channelId: string
  ): Channel<ChannelOptions> | undefined {
    const channel = this.doctracker.channels.find(
      (channel) => channel.id === channelId
    );
    return channel;
  }
}
