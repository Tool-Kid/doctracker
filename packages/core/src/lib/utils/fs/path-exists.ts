import { existsSync } from 'fs';

export function pathExists(path: string) {
  return existsSync(path);
}

export function pathExistsOrThrow(path: string, throwError: string) {
  if (!pathExists(path)) {
    throw new Error(throwError);
  }
}
