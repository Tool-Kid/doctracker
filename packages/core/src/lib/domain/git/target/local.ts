import { git } from '../simple-git';
import { Path } from '../../../domain/path';
import { TargetStrategy } from './target-strategy';
import { serializeFilesChanged } from '../serialize-files-changed';

export class LocalStrategy implements TargetStrategy<undefined> {
  readonly git = git;

  async computeChanges(): Promise<Path[]> {
    const modifiedFilesResult = await this.git.raw('ls-files', '-m');
    return serializeFilesChanged(modifiedFilesResult);
  }
}
