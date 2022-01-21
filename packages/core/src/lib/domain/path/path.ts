interface PathProps {
  readonly path: string;
  readonly relativePath: string;
}

export class Path {
  readonly path: string;
  readonly relativePath: string;

  constructor(props: PathProps) {
    this.path = props.path;
    this.relativePath = props.relativePath;
  }

  public static getMatchingPaths(origin: Path[], target: Path[]): Path[] {
    return origin.filter((originPath) =>
      target.some(
        (targetPath) => originPath.relativePath === targetPath.relativePath
      )
    );
  }
}
