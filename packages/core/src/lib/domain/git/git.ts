import { GitConfig } from '../../config';

export class Git {
  readonly branch: string;

  constructor(config: GitConfig) {
    this.branch = config.branch;
  }
}
