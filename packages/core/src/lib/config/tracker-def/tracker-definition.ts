import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { SegmentDefinition } from './segment-definition';
import 'reflect-metadata';

export class TrackerDefinition {
  @ValidateNested({ each: true })
  @Type(() => SegmentDefinition)
  segments!: SegmentDefinition[];
}
