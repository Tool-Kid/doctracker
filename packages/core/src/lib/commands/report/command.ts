import { Report } from '../../domain';

export class ReportCommand {
  constructor(public readonly report: Report) {}
}
