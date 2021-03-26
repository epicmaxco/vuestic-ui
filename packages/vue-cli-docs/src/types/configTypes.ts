// @ts-ignore
import { TranslationString, ManualApiOptions } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'
import { DefineComponent } from 'vue'
import { VueConstructor } from 'vue-class-component'

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
      componentOptions: DefineComponent | VueConstructor,
      apiOptions: ManualApiOptions,
    }
