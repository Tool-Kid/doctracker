import { TrackerConfig } from '../../config';
import { getTrackerConfig, normalizePath } from '../../utils/fs';
import { Path } from '../path';
import { Segment } from '../segment';

export class Tracker {
  readonly id: string;
  readonly sourcePath: Path;
  readonly docsPath: Path;
  readonly trackerPath: Path;
  readonly segments!: Segment[];
  readonly channelId: string;

  constructor(config: TrackerConfig, sourceRoot: Path) {
    this.id = config.id;
    this.sourcePath = new Path({
      path: normalizePath(sourceRoot.path, config.sourcePath),
      relativePath: normalizePath(config.sourcePath),
    });
    this.docsPath = new Path({
      path: normalizePath(sourceRoot.path, config.docsPath),
      relativePath: normalizePath(config.docsPath),
    });
    this.trackerPath = new Path({
      path: normalizePath(sourceRoot.path, config.sourcePath),
      relativePath: normalizePath(config.sourcePath),
    });
    this.channelId = config.channel || '';
    if (config.trackerPath) {
      const trackerConfigFile = getTrackerConfig(this.trackerPath.path);
      this.segments = trackerConfigFile.segments.map(
        (segment) =>
          new Segment({
            config: segment,
            trackerPath: this.trackerPath,
            docsPath: new Path({
              path: normalizePath(sourceRoot.path, config.docsPath),
              relativePath: normalizePath(config.docsPath),
            }),
          })
      );
    }
    if (config.segments) {
      this.segments = config.segments?.map(
        (segment) =>
          new Segment({
            config: segment,
            trackerPath: this.trackerPath,
            docsPath: new Path({
              path: normalizePath(sourceRoot.path, config.docsPath),
              relativePath: normalizePath(config.docsPath),
            }),
          })
      );
    }
  }
}
