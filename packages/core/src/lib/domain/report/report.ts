import { v4 as uuidv4 } from 'uuid';
import { TrackerReport } from './tracker-report';

export interface ReportProps {
  readonly id: string;
  readonly trackerReports: TrackerReport[];
}

export class Report {
  readonly id: string;
  readonly trackerReports: TrackerReport[];

  constructor(report: Omit<ReportProps, 'id'>) {
    this.id = uuidv4();
    this.trackerReports = report.trackerReports;
  }
}
