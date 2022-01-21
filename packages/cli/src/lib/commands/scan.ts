import {
  DocTracker,
  DocTrackerLogger,
  GitScanOptions,
  mountApp,
  ScanCommandOptions,
  ScannerService,
  TargetType,
} from '@doctracker/core';
import { Command, CommandRunner, Option } from 'nest-commander';

interface ScanOptions {
  target: TargetType;
  report: boolean;
}

@Command({ name: 'scan', description: 'Scan files & report changes' })
export class ScanCommand implements CommandRunner {
  @Option({
    flags: '-t, --target <type>',
    description: 'Target source to compare changes: [local, branch]',
    defaultValue: 'local',
  })
  target(val: string) {
    return val;
  }

  @Option({
    flags: '-r, --report',
    description: 'Report detected changes by DocTracker tool',
    defaultValue: true,
  })
  report(val: string) {
    return Boolean(val);
  }

  @Option({
    flags: '-r, --no-report',
    description: 'Disable report',
    defaultValue: false,
  })
  noReport(val: string) {
    return Boolean(val);
  }

  async run(passedParams: string[], options: ScanOptions): Promise<void> {
    const app = await mountApp();

    const doctracker = app.get(DocTracker);
    const scanner = app.get(ScannerService);
    const logger = app.get(DocTrackerLogger);

    logger.log('info', '⌛ Scanning files...');

    const gitOptions: GitScanOptions = {
      target: options.target,
      branch: doctracker.git.branch,
    };
    const scanOptions: ScanCommandOptions = {
      report: options.report,
    };
    await scanner.scan(gitOptions, scanOptions);
  }
}
