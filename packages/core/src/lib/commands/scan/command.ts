import { GitScanOptions } from '../../domain';

export interface ScanCommandOptions {
  report: boolean;
}

export class ScanCommand {
  constructor(
    public readonly git: GitScanOptions,
    public readonly options: ScanCommandOptions
  ) {}
}
