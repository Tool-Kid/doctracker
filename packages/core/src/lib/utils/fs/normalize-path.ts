import * as path from 'path';

export function normalizePath(...args: string[]) {
  return path.join(...args);
}
