import { Channel } from '../channel';
import { ChannelOptions } from '../options';
import { ChannelType } from '../type';
import axios from 'axios';

export enum HttpMethod {
  Post = 'post',
  Pu = 'put',
}

export type HttpMethodType = `${HttpMethod}`;

export interface HttpChannelOptions extends ChannelOptions {
  url: string;
  method: HttpMethodType;
}

export class HttpChannel implements Channel<HttpChannelOptions> {
  readonly id: string;
  readonly type: ChannelType;
  readonly options: HttpChannelOptions;

  constructor(id: string, options: HttpChannelOptions) {
    this.id = id;
    this.type = 'http';
    this.options = options;
  }
  async publish(report: string): Promise<void> {
    const request = axios({
      method: this.options.method,
      url: this.options.url,
      data: JSON.parse(report),
    });
    await request;
  }
}
