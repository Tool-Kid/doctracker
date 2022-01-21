import { lstatSync } from 'fs';

export function isDir(path: string) {
  try {
    const stats = lstatSync(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}
