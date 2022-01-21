import { isDir } from './is-dir';
import { pathExistsOrThrow } from './path-exists';

export function isDirOrThrow(path: string): boolean {
  pathExistsOrThrow(path, `Directory ${path} does not exists`);
  return isDir(path);
}
