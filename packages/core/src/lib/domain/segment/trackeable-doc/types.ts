export enum TrackeableDocTypes {
  File = 'file',
  Directory = 'dir',
  URL = 'url',
}

export type TrackeableDocType = `${TrackeableDocTypes}`;
export type FileSystemDocType =
  | `${TrackeableDocTypes.File}`
  | `${TrackeableDocTypes.Directory}`;
