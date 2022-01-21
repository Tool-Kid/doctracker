import { Path } from '../../domain/path';
import { normalizePath } from '../../utils/fs';

export function serializeFilesChanged(files: string): Path[] {
  if (files) {
    const modifiedFiles = files.split(`\n`);
    modifiedFiles.pop();
    return modifiedFiles.map(
      (file) => new Path({ path: normalizePath(file), relativePath: file })
    );
  }
  return [];
}
