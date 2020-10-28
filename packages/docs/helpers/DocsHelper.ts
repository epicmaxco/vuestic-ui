import {
  TranslationString,
  ManualApiOptions,
} from 'vuestic-ui/src/services/api-docs/ManualApiOptions'
import {
  BlockType,
  ApiDocsBlock,
  TextBlock,
  PathToExample,
  CodeString,
} from '../types/configTypes'
import { VueConstructor } from 'vue'

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
  example: (component: PathToExample): ApiDocsBlock => {
    return {
      type: BlockType.EXAMPLE,
      component,
    }
  },
  code: (code: CodeString): ApiDocsBlock => {
    return {
      type: BlockType.CODE,
      code,
    }
  },
  api: (componentOptions: VueConstructor, apiOptions: ManualApiOptions): ApiDocsBlock => {
    return {
      type: BlockType.API,
      componentOptions,
      apiOptions,
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
