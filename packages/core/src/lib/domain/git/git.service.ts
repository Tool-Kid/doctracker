import { Injectable } from '@nestjs/common';
import { GitScanOptions } from './options';
import { BranchStrategy, LocalStrategy } from './target';

@Injectable()
export class GitService {
  public getChanges(options: GitScanOptions) {
    switch (options.target) {
      case 'branch':
        return new BranchStrategy().computeChanges(options);
      case 'local':
        return new LocalStrategy().computeChanges();
      default:
        return new LocalStrategy().computeChanges();
    }
  }
}
