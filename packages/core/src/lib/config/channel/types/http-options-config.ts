import { IsEnum, IsUrl } from 'class-validator';
import { HttpMethod, HttpMethodType } from '../../../domain/channel';
import { ChannelOptionsConfig } from './options';

export class HttpOptionsConfig extends ChannelOptionsConfig {
  @IsUrl()
  url!: string;

  @IsEnum(HttpMethod)
  method: HttpMethodType = 'post';
}
