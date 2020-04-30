import { TranslationString } from '../../ui/src/services/api-docs/ManualApiOptions'
import Vue from 'vue-property-decorator'
import 'nuxt-i18n'

export type CodeString = string

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
      component: Vue,
    }
  | {
    type: BlockType.EXAMPLE,
    component: string, // Just file name without extension. Everything else is derived.
  }
