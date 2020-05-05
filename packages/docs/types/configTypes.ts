import { TranslationString } from '../../ui/src/services/api-docs/ManualApiOptions'
import { VueConstructor } from 'vue'

// TODO: move i18n types to appropriate place, e.g. tsconfig, ...
import 'nuxt-i18n'

export type CodeString = string

export enum BlockType {
  TITLE = 'TITLE',
  SUBTITLE = 'SUBTITLE',
  PARAGRAPH = 'PARAGRAPH',
  HEADLINE = 'HEADLINE',
  EXAMPLE = 'EXAMPLE',
  API = 'API',
  CODE = 'CODE',
}

export type TextBlockType =
  | BlockType.TITLE
  | BlockType.SUBTITLE
  | BlockType.PARAGRAPH
  | BlockType.HEADLINE

export type TextBlock = {
  type: TextBlockType,
  translationString: TranslationString,
}

export type ApiDocsBlock =
  | TextBlock
  | {
      type: BlockType.API,
      component: VueConstructor,
    }
  | {
      type: BlockType.EXAMPLE,
      component: string, // Just file name without extension. Everything else is derived.
    }
  | {
      type: BlockType.CODE,
      code: CodeString,
    }
