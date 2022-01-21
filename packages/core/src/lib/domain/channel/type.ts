export enum ChannelTypes {
  Console = 'console',
  Http = 'http',
  Github_PR = 'github_pr',
}

export type ChannelType = `${ChannelTypes}`;
