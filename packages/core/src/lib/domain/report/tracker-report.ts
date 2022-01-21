import { SegmentReport } from './segment-report';

interface TrackerReportProps {
  readonly trackerId: string;
  readonly channelId: string;
  readonly segmentReports: SegmentReport[];
}

export class TrackerReport {
  readonly trackerId: string;
  readonly channelId: string;
  readonly segmentReports: SegmentReport[];

  constructor(config: TrackerReportProps) {
    this.trackerId = config.trackerId;
    this.channelId = config.channelId;
    this.segmentReports = config.segmentReports;
  }
}
