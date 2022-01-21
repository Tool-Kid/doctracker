import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ChannelConfig } from './channel/channel-config';
import 'reflect-metadata';

export class ReporterConfig {
  @ValidateNested({ each: true })
  @Type(() => ChannelConfig)
  channels!: ChannelConfig[];
}
