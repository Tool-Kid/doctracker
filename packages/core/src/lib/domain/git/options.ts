export type TargetType = 'local' | 'branch';
export interface GitScanOptions {
  target: TargetType;
  branch: string;
}
