import { SegmentDefinition } from '../../config/tracker-def';
import {
  getFilesForDir,
  isDirOrThrow,
  isFileOrThrow,
  normalizePath,
} from '../../utils/fs';
import { createPath, Path } from '../path';
import { TrackeableDoc, TrackeableDocFactory } from './trackeable-doc';

interface SegmentCtr {
  readonly config: SegmentDefinition;
  readonly trackerPath: Path;
  readonly docsPath: Path;
}

export class Segment {
  readonly id: string;
  readonly source: Path[];
  readonly docs: TrackeableDoc[];
  readonly docsPath: Path;
  readonly trackeableDocFactory = new TrackeableDocFactory();

  constructor({ config, trackerPath, docsPath }: SegmentCtr) {
    this.id = config.id;
    this.docsPath = docsPath;
    this.source = this.mapSources(config.source, trackerPath);
    this.docs = config.docs.map((doc) =>
      this.trackeableDocFactory.build({ docsPath: this.docsPath, doc })
    );
  }

  private mapSources(sources: string[], trackerPath: Path) {
    const allSources = [];
    for (const source of sources) {
      if (isFileOrThrow(normalizePath(trackerPath.path, source))) {
        allSources.push(createPath(trackerPath, source));
      } else if (isDirOrThrow(normalizePath(trackerPath.path, source))) {
        const dirFiles = getFilesForDir(source).map((source) =>
          createPath(trackerPath, source)
        );
        allSources.push(...dirFiles);
      }
    }
    return allSources;
  }
}
