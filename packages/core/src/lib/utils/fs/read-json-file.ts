import { readFileSync } from 'fs';
import { pathExistsOrThrow } from './path-exists';

export function readJSONFile(path: string) {
  pathExistsOrThrow(path, `JSON file at ${path} does not exists`);
  const file = readFileSync(path);
  const fileJSON = JSON.parse(file.toString());
  return fileJSON;
}
