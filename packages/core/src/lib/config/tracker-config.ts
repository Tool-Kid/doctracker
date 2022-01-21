import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { SegmentDefinition } from './tracker-def';
import 'reflect-metadata';

export class TrackerConfig {
  @IsString()
  id!: string;

  @IsString()
  sourcePath!: string;

  @IsString()
  docsPath!: string;

  @IsString()
  @IsOptional()
  trackerPath?: string;

  @IsString()
  @IsOptional()
  channel?: string;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => SegmentDefinition)
  segments?: SegmentDefinition[];
}
