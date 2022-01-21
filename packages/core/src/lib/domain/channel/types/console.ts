import { LOGGER } from '../../../logger';
import { Channel } from '../channel';
import { ChannelOptions } from '../options';
import { ChannelType } from '../type';

export interface ConsoleChanelOptions extends ChannelOptions {
  verbose: boolean;
}

export class ConsoleChannel implements Channel<ConsoleChanelOptions> {
  readonly id: string;
  readonly type: ChannelType;
  readonly options: ConsoleChanelOptions;

  constructor(id: string, options: ConsoleChanelOptions) {
    this.id = id;
    this.type = 'console';
    this.options = options;
  }

  async publish(report: string): Promise<void> {
    if (!this.options.log) {
      return;
    }
    switch (this.options.format) {
      case 'default':
        LOGGER.log('warn', report);
        break;
      case 'json':
        LOGGER.log('warn', report);
        break;
      default:
        LOGGER.log('warn', report);
    }
  }
}
