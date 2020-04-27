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
}

export type ApiDocsBlock =
  | {
      type: Exclude<BlockType, BlockType.COMPONENT>,
      translationString: TranslationString,
    }
  | {
      type: BlockType.COMPONENT,
      component: Vue,
    }
  | {
      type: BlockType.CODE,
      code: CodeString,
  }
