// @ts-ignore
import { TranslationString, ManualApiOptions } from 'vuestic-ui/src/services/api-docs/ManualApiOptions'
import {
  BlockType,
  ApiDocsBlock,
  TextBlock,
  PathToExample,
  CodeString,
  ExampleComponentProps,
} from '@/types/configTypes'
import { DefineComponent } from 'vue'
import { VueConstructor } from 'vue-class-component'
import { TableData, TableColum } from './../components/DocsTable/DocsTable'

export const DocsHelper = {
  title: (translationString: TranslationString): TextBlock => {
    return {
      type: BlockType.TITLE,
      translationString,
    }
  },
  subtitle: (translationString: TranslationString): TextBlock => {
    return {
      type: BlockType.SUBTITLE,
      translationString,
    }
  },
  paragraph: (translationString: TranslationString): TextBlock => {
    return {
      type: BlockType.PARAGRAPH,
      translationString,
    }
  },
  headline: (translationString: TranslationString): TextBlock => {
    return {
      type: BlockType.HEADLINE,
      translationString,
    }
  },
  example: (component: PathToExample, props?: ExampleComponentProps): ApiDocsBlock => {
    return {
      type: BlockType.EXAMPLE,
      component,
      props,
    }
  },
  code: (code: CodeString): ApiDocsBlock => {
    return {
      type: BlockType.CODE,
      code,
    }
  },
  api: (componentOptions: DefineComponent | VueConstructor, apiOptions: ManualApiOptions): ApiDocsBlock => {
    return {
      type: BlockType.API,
      componentOptions,
      apiOptions,
    }
  },
  table: (columns: TableColum[], tableData: TableData) => {
    return {
      type: BlockType.TABLE,
      columns,
      tableData,
    }
  },
  link: (text: string, href: string, options?: { preText?: string, afterText?: string }) => {
    return {
      type: BlockType.LINK,
      text,
      href,
      options,
    }
  },
  alert: (translationString: TranslationString, color: string) => {
    return {
      type: BlockType.ALERT,
      translationString,
      color,
    }
  },

  // ********** Higher level helpers ****************

  exampleBlock: (title: TranslationString, description: TranslationString, example: PathToExample): ApiDocsBlock[] => {
    return [
      DocsHelper.headline(title),
      DocsHelper.paragraph(description),
      DocsHelper.example(example),
    ]
  },
}
