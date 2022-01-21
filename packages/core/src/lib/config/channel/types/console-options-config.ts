import { IsBoolean } from 'class-validator';
import { ChannelOptionsConfig } from './options';

export class ConsoleOptionsConfig extends ChannelOptionsConfig {
  @IsBoolean()
  verbose? = true;
}
