import { normalizePath } from '../../utils';
import { Path } from './path';

export function createPath(root: Path, source: string): Path {
  return new Path({
    path: normalizePath(root.path, source),
    relativePath: normalizePath(root.relativePath, source),
  });
}
