import { lstatSync } from 'fs';

export function isFile(path: string) {
  try {
    const stats = lstatSync(path);
    return stats.isFile();
  } catch {
    return false;
  }
}
