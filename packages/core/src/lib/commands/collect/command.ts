import { GitScanOptions } from '../../domain';

export class CollectCommand {
  constructor(public readonly options: GitScanOptions) {}
}
