import { TrackeableDocType } from './types';

export interface TrackeableDoc {
  readonly type: TrackeableDocType;
  get value(): string;
}
