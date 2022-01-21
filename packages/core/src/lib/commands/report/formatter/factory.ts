import { ChannelFormatType } from '../../../domain/channel';
import { DefaultFormatter } from './default';
import { Formatter } from './formatter';
import { JSONFormatter } from './json';

export class FormatterFactory {
  build(format: ChannelFormatType): Formatter {
    switch (format) {
      case 'default':
        return new DefaultFormatter();
      case 'json':
        return new JSONFormatter();
      default:
        return new DefaultFormatter();
    }
  }
}
