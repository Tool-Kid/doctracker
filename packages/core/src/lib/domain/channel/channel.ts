import { ChannelOptions } from './options';
import { ChannelType } from './type';

export interface Channel<Options extends ChannelOptions> {
  readonly id: string;
  readonly type: ChannelType;
  readonly options: Options;
  publish(report: string): Promise<void>;
}
