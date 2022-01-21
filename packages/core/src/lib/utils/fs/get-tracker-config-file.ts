import { plainToInstance } from 'class-transformer';
import { TrackerDefinition } from '../../config/tracker-def/tracker-definition';
import { pathExistsOrThrow } from './path-exists';
import { readJSONFile } from './read-json-file';

export function getTrackerConfig(path: string): TrackerDefinition {
  pathExistsOrThrow(path, `No configuration file fount at ${path}`);
  const configFile = readJSONFile(path);
  return plainToInstance(TrackerDefinition, configFile);
}
