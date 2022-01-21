import { Injectable } from '@nestjs/common';
import {
  DocTracker,
  GitService,
  Path,
  Report,
  Segment,
  SegmentReport,
  Tracker,
  TrackerReport,
  GitScanOptions,
} from '../../domain';

@Injectable()
export class CollectorService {
  constructor(
    private readonly doctracker: DocTracker,
    private readonly git: GitService
  ) {}

  public async collect(options: GitScanOptions) {
    const trackerReports: TrackerReport[] = [];
    for (const tracker of this.doctracker.trackers) {
      const trackerReport = await this.collectTracker(tracker, options);
      if (trackerReport) {
        trackerReports.push(trackerReport);
      }
    }
    const report = new Report({ trackerReports });
    return report;
  }

  private async collectTracker(collectable: Tracker, options: GitScanOptions) {
    const report: SegmentReport[] = [];
    for (const segment of collectable.segments) {
      const segmentReport = await this.collectSegment(segment, options);
      if (segmentReport) {
        report.push(segmentReport);
      }
    }
    if (report.length) {
      return new TrackerReport({
        trackerId: collectable.id,
        segmentReports: report,
        channelId: collectable.channelId,
      });
    }
    return null;
  }

  private async collectSegment(collectable: Segment, options: GitScanOptions) {
    const modifiedFiles = await this.git.getChanges(options);
    const modifiedSegmentFiles = Path.getMatchingPaths(
      modifiedFiles,
      collectable.source
    );
    if (modifiedSegmentFiles.length) {
      const report = new SegmentReport({
        segmentId: collectable.id,
        modifiedSources: modifiedSegmentFiles,
        affectedDocs: collectable.docs,
      });
      return report;
    }
    return null;
  }
}
