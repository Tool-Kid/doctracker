import { delimiter } from '../../../../utils';
import { Formatter } from '../formatter';
import { getEmojiForTrackeableDocType } from './emoji';
import { Report, SegmentReport, TrackerReport } from '../../../../domain';

export class DefaultFormatter implements Formatter {
  format(report: Report): string[] {
    const header = this.formatHeader(report);
    const trackers = report.trackerReports
      .map((trackerReport) => this.formatTracker(trackerReport))
      .reduce((acc, val) => acc.concat(val));
    return [...header, ...trackers];
  }

  private formatHeader(report: Report): string[] {
    return [delimiter(), `📜 <Report: ${report.id}>`, delimiter(), ''];
  }

  private formatTracker(report: TrackerReport): string[] {
    const messageTemplate = [
      `   🔎 Report for <Tracker: ${report.trackerId}>`,
      ``,
    ];
    const segments = report.segmentReports
      .map((segmentReport) => this.formatSegment(segmentReport))
      .reduce((acc, val) => acc.concat(val));
    return [...messageTemplate, ...segments];
  }

  private formatSegment(report: SegmentReport): string[] {
    const modifiedSources = report.modifiedSources.map(
      (source) => `📄 ${source.relativePath}`
    );
    const affectedDocs = report.affectedDocs.map(
      (doc) => `${getEmojiForTrackeableDocType(doc.type)} ${doc.value}`
    );
    const messageTemplate = [
      delimiter(),
      `      📈 <Segment: ${report.segmentId}>`,
      delimiter(),
      '',
      delimiter(),
      `         📄 Modified Sources`,
      delimiter(),
      ...modifiedSources,
      delimiter(),
      '',
      delimiter(),
      `         📚 Affected Docs`,
      delimiter(),
      ...affectedDocs,
      delimiter(),
    ];
    return messageTemplate;
  }
}
