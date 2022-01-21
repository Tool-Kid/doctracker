import { TrackeableDoc } from './trackeable-doc';
import { TrackeableDocType } from './types';

export class URLDoc implements TrackeableDoc {
  readonly url: URL;
  readonly type: TrackeableDocType;

  constructor(url: string, type: TrackeableDocType) {
    this.url = new URL(url);
    this.type = type;
  }
  get value(): string {
    return this.url.toString();
  }
}
