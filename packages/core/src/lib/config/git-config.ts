import { IsString } from 'class-validator';

export class GitConfig {
  @IsString()
  branch!: string;
}
