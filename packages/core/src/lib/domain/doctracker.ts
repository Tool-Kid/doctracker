import { Tracker } from './tracker';
import { DocTrackerConfig } from '../config';
import { Git } from './git';
import { Path } from './path';
import { Channel, ChannelFactory, ChannelOptions } from './channel';

export class DocTracker {
  readonly git: Git;
  readonly trackers: Tracker[];
  readonly channels: Channel<ChannelOptions>[];
  readonly rootPath: Path;
  readonly doctrackerPath: Path;

  constructor(config: DocTrackerConfig) {
    this.git = new Git(config.git);
    this.trackers = config.trackers.map(
      (tracker) =>
        new Tracker(
          tracker,
          new Path({ path: config.sourceRoot, relativePath: config.sourceRoot })
        )
    );
    const factory = new ChannelFactory();
    this.channels = config.reporter.channels.map<Channel<ChannelOptions>>(
      ({ id, type, options }) => factory.build({ id, type, options })
    );
    this.rootPath = new Path({ path: config.sourceRoot, relativePath: './' });
    this.doctrackerPath = new Path({
      path: config.configPath,
      relativePath: './doctracker.config.json',
    });
  }
}
