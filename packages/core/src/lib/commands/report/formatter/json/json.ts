import { Report } from '../../../../domain';
import { Formatter } from '../formatter';

export class JSONFormatter implements Formatter {
  format(report: Report): string[] {
    return [JSON.stringify(report, null, 2)];
  }
}
