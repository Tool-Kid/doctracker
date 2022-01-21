import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ReportMessageConfig } from './report-message';

export class SegmentDefinition {
  @IsString()
  id!: string;

  @IsArray()
  source!: string[];

  @IsArray()
  docs!: string[];

  @ValidateNested()
  @IsOptional()
  report?: ReportMessageConfig;
}
