import { Path } from '../../../domain/path';

export interface TargetStrategy<Args> {
  computeChanges(options: Args): Promise<Path[]>;
}
