import { Path } from '../../path';
import { TrackeableDoc } from './trackeable-doc';
import { FileSystemDocType, TrackeableDocType } from './types';

export class FileSystemDoc implements TrackeableDoc {
  readonly path: Path;
  readonly type: TrackeableDocType;

  constructor(path: Path, type: FileSystemDocType) {
    this.path = path;
    this.type = type;
  }

  get value(): string {
    return this.path.relativePath;
  }
}
