import { Report } from '../../../domain';

export interface Formatter {
  format(report: Report): string[];
}
