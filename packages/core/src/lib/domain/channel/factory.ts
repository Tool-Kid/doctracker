import { Channel } from './channel';
import { ChannelOptions } from './options';
import { ChannelType } from './type';
import {
  ConsoleChanelOptions,
  ConsoleChannel,
  HttpChannel,
  HttpChannelOptions,
} from './types';

interface BuildParams {
  id: string;
  type: ChannelType;
  options: unknown;
}

export class ChannelFactory {
  public build({ id, type, options }: BuildParams): Channel<ChannelOptions> {
    switch (type) {
      case 'console':
        return new ConsoleChannel(id, options as ConsoleChanelOptions);
      case 'http':
        return new HttpChannel(id, options as HttpChannelOptions);
      default:
        return new ConsoleChannel(id, options as ConsoleChanelOptions);
    }
  }
}
