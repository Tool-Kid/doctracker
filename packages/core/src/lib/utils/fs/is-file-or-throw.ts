import { isFile } from './is-file';
import { pathExistsOrThrow } from './path-exists';

export function isFileOrThrow(path: string): boolean {
  pathExistsOrThrow(path, `File ${path} does not exists`);
  return isFile(path);
}
