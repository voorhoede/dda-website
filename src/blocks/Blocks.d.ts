import {
  EmbedBlockFragment,
  ImageBlockFragment,
  TableBlockFragment,
  TextBlockFragment,
  VideoEmbedBlockFragment,
} from '@lib/types/datocms';

export type AnyBlock =
  | EmbedBlockFragment
  | ImageBlockFragment
  | TableBlockFragment
  | TextBlockFragment
  | VideoEmbedBlockFragment;
