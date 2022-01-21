import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { ChannelType, ChannelTypes } from '../../domain/channel';
import { Type } from 'class-transformer';
import {
  ChannelOptionsConfig,
  ConsoleOptionsConfig,
  GitHubPROptionsConfig,
  HttpOptionsConfig,
} from './types';
import 'reflect-metadata';

export class ChannelConfig {
  @IsString()
  id!: string;

  @IsEnum(ChannelTypes)
  type!: ChannelType;

  @ValidateNested()
  @Type(() => ChannelOptionsConfig, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: ConsoleOptionsConfig, name: 'console' },
        { value: GitHubPROptionsConfig, name: 'github_pr' },
        { value: HttpOptionsConfig, name: 'http' },
      ],
    },
  })
  options?: ConsoleOptionsConfig | GitHubPROptionsConfig;
}
