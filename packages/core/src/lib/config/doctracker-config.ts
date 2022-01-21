import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { GitConfig } from './git-config';
import { ReporterConfig } from './reporter-config';
import { TrackerConfig } from './tracker-config';
import 'reflect-metadata';

export class DocTrackerConfig {
  @ValidateNested()
  @Type(() => GitConfig)
  git!: GitConfig;

  @ValidateNested({ each: true })
  @Type(() => TrackerConfig)
  trackers!: TrackerConfig[];

  @ValidateNested()
  @Type(() => ReporterConfig)
  reporter!: ReporterConfig;

  @IsString()
  sourceRoot!: string;

  @IsString()
  configPath!: string;
}
