import { Path } from '../path';
import { TrackeableDoc } from '../segment';

interface SegmentReportProps {
  readonly segmentId: string;
  readonly modifiedSources: Path[];
  readonly affectedDocs: TrackeableDoc[];
}

export class SegmentReport {
  readonly segmentId: string;
  readonly modifiedSources: Path[];
  readonly affectedDocs: TrackeableDoc[];

  constructor(report: SegmentReportProps) {
    this.segmentId = report.segmentId;
    this.modifiedSources = report.modifiedSources;
    this.affectedDocs = report.affectedDocs;
  }

  get messages(): string[] {
    //const formatter = new DefaultFormatter();
    //return formatter.format(this);
    return [];
  }
}
