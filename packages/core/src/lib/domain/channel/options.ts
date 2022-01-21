export enum ChannelFormatTypes {
  Default = 'default',
  JSON = 'json',
}

export type ChannelFormatType = `${ChannelFormatTypes}`;

export interface ChannelOptions {
  log: boolean;
  format: ChannelFormatType;
}
