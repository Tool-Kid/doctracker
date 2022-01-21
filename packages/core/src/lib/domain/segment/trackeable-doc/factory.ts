import { isDir, isFile, normalizePath } from '../../../utils';
import { createPath, Path } from '../../path';
import { FileSystemDoc } from './file-system-doc';
import { TrackeableDoc } from './trackeable-doc';
import { TrackeableDocType } from './types';
import { URLDoc } from './url-doc';

interface TrackeableDocBuilderArgs {
  doc: string;
  docsPath: Path;
}

export class TrackeableDocFactory {
  public build(props: TrackeableDocBuilderArgs): TrackeableDoc {
    const docType = this.getType(props.doc, props.docsPath);
    switch (docType) {
      case 'file':
        return new FileSystemDoc(createPath(props.docsPath, props.doc), 'file');
      case 'dir':
        return new FileSystemDoc(createPath(props.docsPath, props.doc), 'dir');
      case 'url':
        return new URLDoc(props.doc, 'url');
    }
  }

  private getType(doc: string, docsPath: Path): TrackeableDocType {
    const path = normalizePath(docsPath.path, doc);
    if (isFile(path)) {
      return 'file';
    }
    if (isDir(path)) {
      return 'dir';
    }
    if (this.isURL(doc)) {
      return 'url';
    }
    throw new Error(`No supported type for doc ${doc}`);
  }

  private isURL(doc: string): boolean {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );
    return !!pattern.test(doc);
  }
}
