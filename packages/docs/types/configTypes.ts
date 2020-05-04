import { TranslationString } from '../../ui/src/services/api-docs/ManualApiOptions'
import { VueConstructor } from 'vue'

// TODO: move i18n types to appropriate place, e.g. tsconfig, ...
import 'nuxt-i18n'

export enum BlockType {
  TITLE = 'TITLE',
  SUBTITLE = 'SUBTITLE',
  PARAGRAPH = 'PARAGRAPH',
  HEADLINE = 'HEADLINE',
  EXAMPLE = 'EXAMPLE',
  API = 'API',
}

export type TextBlock =
  | BlockType.TITLE
  | BlockType.SUBTITLE
  | BlockType.PARAGRAPH
  | BlockType.HEADLINE

export type ApiDocsBlock =
  | {
      type: TextBlock,
      translationString: TranslationString,
    }
  | {
      type: BlockType.API,
      component: VueConstructor,
    }
  | {
      type: BlockType.EXAMPLE,
      component: string, // Just file name without extension. Everything else is derived.
      namespace?: string,
    }
