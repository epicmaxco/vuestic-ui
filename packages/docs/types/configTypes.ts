import { TranslationString } from '../../ui/src/services/api-docs/ManualApiOptions'
import Vue from 'vue-property-decorator'

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
  type: BlockType.TITLE | BlockType.SUBTITLE | BlockType.PARAGRAPH | BlockType.HEADLINE,
  translationString: TranslationString,
}
  | {
  type: BlockType.COMPONENT,
  component: string, // Just file name without extension. Everything else is derived.
}
  | {
  type: BlockType.API,
  component: Vue,
}
  | {
  type: BlockType.CODE,
  code: CodeString,
}
