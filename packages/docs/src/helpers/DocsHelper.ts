// @ts-ignore
import { TranslationString, ManualApiOptions } from '../../../DocsApi/ManualApiOptions'
import {
  BlockType,
  ApiDocsBlock,
  TextBlock,
  CodeString,
  LinkOptions,
  ExampleOptions, CodeLanguage, ListBlock,
} from '../types/configTypes'
import { DefineComponent } from 'vue'
import { VueConstructor } from 'vue-class-component'
import { TableData, TableColumn } from './../components/DocsTable/DocsTableTypes'

export class PageGenerationHelper {
  path: string

/*
  The path to the page directory with the page-config.
  Example: for '@/page-configs/ui-elements/affix/.' it will be 'ui-elements/affix'
  which is similar with the documentation url: 'https://www.vuestic.dev/en/ui-elements/affix'
  and NUXT pages folder '@/pages/ui-elements/affix' for this page.
*/
  constructor (path: string) {
    this.path = path.replace('src/', '')
  }

  title (translationString: TranslationString): TextBlock {
    return {
      type: BlockType.TITLE,
      translationString,
    }
  }

  subtitle (translationString: TranslationString): TextBlock {
    return {
      type: BlockType.SUBTITLE,
      translationString,
    }
  }

  paragraph (translationString: TranslationString): TextBlock {
    return {
      type: BlockType.PARAGRAPH,
      translationString,
    }
  }

  headline (translationString: TranslationString): TextBlock {
    return {
      type: BlockType.HEADLINE,
      translationString,
    }
  }

  example (component: string, exampleOptions: ExampleOptions = {}): ApiDocsBlock {
    return {
      type: BlockType.EXAMPLE,
      path: this.path,
      component,
      exampleOptions: exampleOptions,
    }
  }

  component (component: string): ApiDocsBlock {
    return {
      type: BlockType.COMPONENT,
      path: this.path,
      component,
    }
  }

  code (code: CodeString, language: CodeLanguage = 'javascript'): ApiDocsBlock {
    return {
      type: BlockType.CODE,
      code,
      language,
    }
  }

  api (componentOptions: DefineComponent<any, any, any, any, any, any, any, any, any, any, any> | VueConstructor, apiOptions: ManualApiOptions): ApiDocsBlock {
    return {
      type: BlockType.API,
      componentOptions,
      apiOptions,
    }
  }

  table (columns: TableColumn[], tableData: TableData): ApiDocsBlock {
    return {
      type: BlockType.TABLE,
      columns,
      tableData,
    }
  }

  link (text: string, href: string, options: LinkOptions = {}): ApiDocsBlock {
    return {
      type: BlockType.LINK,
      text,
      href,
      options,
    }
  }

  alert (translationString: TranslationString, color: string): ApiDocsBlock {
    return {
      type: BlockType.ALERT,
      translationString,
      color,
    }
  }

  list (translationStringList: TranslationString[]): ListBlock {
    return {
      type: BlockType.LIST,
      translationStringList,
    }
  }

  // ********** Higher level helpers ****************
  exampleBlock (title: TranslationString, description: TranslationString, example: string, exampleOptions: ExampleOptions = {}): ApiDocsBlock[] {
    return [
      this.headline(title),
      this.paragraph(description),
      this.example(example, exampleOptions),
    ]
  }
}
