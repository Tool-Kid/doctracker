import { readdirSync } from 'fs';
import { pathExistsOrThrow } from './path-exists';

export function getFilesForDir(path: string) {
  pathExistsOrThrow(path, `Directory ${path} does not exists`);
  const files = readdirSync(path);
  return files;
}
