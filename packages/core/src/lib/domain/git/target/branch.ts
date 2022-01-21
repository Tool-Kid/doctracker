import { Path } from '../../../domain/path';
import { TargetStrategy } from './target-strategy';
import { LOGGER } from '../../../logger';
import { serializeFilesChanged } from '../serialize-files-changed';
import { git } from '../simple-git';

interface BranchStrategyOptions {
  branch: string;
}

export class BranchStrategy implements TargetStrategy<BranchStrategyOptions> {
  readonly git = git;

  async computeChanges({ branch }: BranchStrategyOptions): Promise<Path[]> {
    LOGGER.log(
      'info',
      `✨ Start scanning operation using target branch <${branch}>...`
    );

    const workingBranch = await this.git.revparse(['--abbrev-ref', 'HEAD']);

    if (branch === workingBranch) {
      return await this.getChanges(workingBranch, branch);
    }

    return await this.stashAndCheckout(workingBranch, branch);
  }

  private async stashAndCheckout(
    workingBranch: string,
    targetBranch: string
  ): Promise<Path[]> {
    const hasChanges = await this.git.diff(['--name-only']);

    if (hasChanges) {
      LOGGER.log(
        'info',
        `💾 Stashing changes from current branch <${workingBranch}>...`
      );
      const stashName = `DocTracker-${Date.now()}`;
      await git.stash(['push', '-m', stashName]);
      LOGGER.log(
        'info',
        `✅ Stash successfully created with name ${stashName}`
      );
    }

    LOGGER.log('info', `🏃 Checking out to target branch <${targetBranch}>...`);
    await git.checkout(targetBranch);
    LOGGER.log('info', `✅ Check out completed!`);

    const changes = await this.getChanges(workingBranch, targetBranch);

    LOGGER.log(
      'info',
      `🏃 Checking out to working branch <${workingBranch}> & applying stash...`
    );
    await git.checkout(workingBranch);

    if (hasChanges) {
      await git.stash(['pop', 'stash@{0}']);
      LOGGER.log('info', `✅ Stash applied successfully!`);
    }

    return changes;
  }

  private async getChanges(
    workingBranch: string,
    targetBranch: string
  ): Promise<Path[]> {
    LOGGER.log('info', `⌛ Computing changes...`);
    const changesRaw: string = await this.git.diff([
      '--name-only',
      `${workingBranch}`,
      targetBranch,
    ]);
    LOGGER.log('info', `✅ Changes computed!`);
    return serializeFilesChanged(changesRaw);
  }
}
