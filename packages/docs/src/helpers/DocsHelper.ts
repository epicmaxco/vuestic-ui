// @ts-ignore
import { TranslationString, ManualApiOptions } from '../../../DocsApi/ManualApiOptions'
import {
  BlockType,
  ApiDocsBlock,
  TextBlock,
  CodeStringOrObject,
  LinkOptions,
  ExampleOptions, CodeLanguage, ListBlock,
} from '../types/configTypes'
import { DefineComponent } from 'vue'
import { VueConstructor } from 'vue-class-component'
import { TableData, TableColumn } from './../components/DocsTable/DocsTableTypes'

export const getOptimizedPathFromPath = (path: string): string => {
  /**
   * work's example:
   * 'src\page-configs\ui-elements\component-name' --> 'component-name'
   * why:
   * it is only a guess that the path written through the relative operator "../"
   * works differently in unix and windows and for fully identical operation
   * in webpack we have to pass a more specific path as specified in the documentation
   * https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
   * TODO: To remove this hack, we need to pass the name of the folder from which the webpack should import in each case instead of path
   **/

  return path.match(/.*?page-configs[\\/](.*)$/)?.[1].replace(/\\/g, '/') || ''
}

export class PageGenerationHelper {
  path: string

/*
  The path to the page directory with the page-config.
  Example: for '@/page-configs/ui-elements/affix/.' it will be 'ui-elements/affix'
  which is similar with the documentation url: 'https://www.vuestic.dev/en/ui-elements/affix'
  and NUXT pages folder '@/pages/ui-elements/affix' for this page.
*/
  constructor (path: string) {
    // this.path = path.replace('src/page-configs/', '')
    this.path = getOptimizedPathFromPath(path)
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

  component (component: string, options?: Partial<{ bind: Record<string, any> }>): ApiDocsBlock {
    return {
      type: BlockType.COMPONENT,
      path: this.path,
      component,
      bind: options?.bind,
    }
  }

  code (code: CodeStringOrObject, language: CodeLanguage = 'javascript'): ApiDocsBlock {
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

  alert (
    translationString: TranslationString,
    color: 'primary' | 'warning' | 'info' | 'danger',
  ): ApiDocsBlock {
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

  collapse (header: string, ...blocks: ApiDocsBlock[]): ApiDocsBlock {
    return {
      type: BlockType.COLLAPSE,
      header,
      blocks: blocks,
    }
  }

  markdown (content: string): ApiDocsBlock {
    return {
      type: BlockType.MARKDOWN,
      content,
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

  file (file: Promise<Record<string, any>>): ApiDocsBlock {
    return {
      type: BlockType.FILE,
      file,
    }
  }
}
