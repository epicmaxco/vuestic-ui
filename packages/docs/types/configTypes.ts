import { TranslationString } from '../../ui/src/services/api-docs/ManualApiOptions'
import Vue from 'vue-property-decorator'
import 'nuxt-i18n'

export type CodeString = string

export enum BlockType {
  COMPONENT = 'COMPONENT',
  TITLE = 'TITLE',
  SUBTITLE = 'SUBTITLE',
  PARAGRAPH = 'PARAGRAPH',
  HEADLINE = 'HEADLINE',
  CODE = 'CODE',
  API = 'API',
}

export type ApiDocsBlock =
  | {
      type:
        | BlockType.TITLE
        | BlockType.SUBTITLE
        | BlockType.PARAGRAPH
        | BlockType.HEADLINE,
      translationString: TranslationString,
      text: string,
    }
  | {
      type: BlockType.COMPONENT,
      component: string, // Just file name without extension. Everything else is derived.
      text: string,
    }
  | {
      type: BlockType.CODE,
      code: CodeString,
      text: string,
    }
  | {
      type: BlockType.API,
      component: Vue,
      text: string,
    }
