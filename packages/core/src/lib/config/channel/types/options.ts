import { IsBoolean, IsEnum } from 'class-validator';
import { ChannelFormatType, ChannelFormatTypes } from '../../../domain/channel';

export class ChannelOptionsConfig {
  @IsBoolean()
  log = true;

  @IsEnum(ChannelFormatTypes)
  format?: ChannelFormatType = 'default';
}
