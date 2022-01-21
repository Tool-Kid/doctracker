import { TrackeableDocType } from '../../../../domain';

const EMOJI_DOCTYPE_MAP = new Map<TrackeableDocType, string>([
  ['file', '📄'],
  ['dir', '📁'],
  ['url', '🔗'],
]);

export function getEmojiForTrackeableDocType(type: TrackeableDocType) {
  return EMOJI_DOCTYPE_MAP.get(type) || '';
}
