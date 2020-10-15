import {
  TranslationString,
  ManualApiOptions,
} from '../../ui/src/services/api-docs/ManualApiOptions'
import { VueConstructor } from 'vue'

export type CodeString = string
// example: for `/examples/va-affix/Bottom.vue` use `va-affix/Bottom.vue` here.
export type PathToExample = string

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
      type: BlockType.EXAMPLE,
      component: PathToExample, // path to example
    }
  | {
      type: BlockType.CODE,
      code: CodeString,
    }
  | {
      type: BlockType.API,
      componentOptions: VueConstructor,
      apiOptions: ManualApiOptions,
    }
