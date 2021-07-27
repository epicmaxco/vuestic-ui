// @ts-ignore
import {
  TranslationString,
  ManualApiOptions,
  TranslationStringList,
} from '../components/DocsApi/ManualApiOptions'
import { TableData, TableColumn } from '../components/DocsTable/DocsTable'
import { DefineComponent } from 'vue'
import { VueConstructor } from 'vue-class-component'

export type CodeString = string
export type CodeLanguage = 'javascript' | 'scss' | 'bash'
// example: for `/examples/va-affix/Bottom.vue` use `va-affix/Bottom.vue` here.
export type PathToExample = string
export type ExampleOptions = {
  hideCode?: boolean
}
export type LinkOptions = {
  preText?: string,
  afterText?: string,
}

// NOTE If you add other block types - please document them properly in http://vuestic-ui.dev/en/contribution/documentation-page
export enum BlockType {
  TITLE = 'TITLE',
  SUBTITLE = 'SUBTITLE',
  PARAGRAPH = 'PARAGRAPH',
  HEADLINE = 'HEADLINE',
  EXAMPLE = 'EXAMPLE',
  API = 'API',
  CODE = 'CODE',
  TABLE = 'TABLE',
  LINK = 'LINK',
  ALERT = 'ALERT',
  LIST = 'LIST'
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

export type ListBlock = {
  type: BlockType.LIST,
  translationStringList: TranslationStringList,
}

export type ApiDocsBlock =
  | TextBlock
  | {
      type: BlockType.EXAMPLE,
      component: PathToExample, // path to example
      exampleOptions?: ExampleOptions,
    }
  | {
      type: BlockType.CODE,
      code: CodeString,
      language: CodeLanguage,
    }
  | {
      type: BlockType.API,
      componentOptions: DefineComponent | VueConstructor,
      apiOptions: ManualApiOptions,
    }
  | {
      type: BlockType.TABLE,
      columns: TableColumn[],
      tableData: TableData,
    }
  | {
      type: BlockType.LINK,
      text: string,
      href: string,
      options?: LinkOptions,
    }
  | {
      type: BlockType.ALERT,
      translationString: TranslationString,
      color: string,
    }
