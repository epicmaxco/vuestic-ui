import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import blocktypes from './block-types'
import apiOptions from './api-options'
export default [
  {
    type: BlockType.TITLE,
    translationString: 'documentationPage.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.description',
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'documentationPage.blocktypesTitle',
  },
  // title
  {
    type: BlockType.HEADLINE,
    translationString: 'documentationPage.blocktypes.title.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.blocktypes.title.text',
  },
  {
    type: BlockType.CODE,
    code: blocktypes.title,
  },
  // subtitle
  {
    type: BlockType.HEADLINE,
    translationString: 'documentationPage.blocktypes.subtitle.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.blocktypes.subtitle.text',
  },
  {
    type: BlockType.CODE,
    code: blocktypes.subtitle,
  },
  // headline
  {
    type: BlockType.HEADLINE,
    translationString: 'documentationPage.blocktypes.headline.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.blocktypes.headline.text',
  },
  {
    type: BlockType.CODE,
    code: blocktypes.headline,
  },
  // paragraph
  {
    type: BlockType.HEADLINE,
    translationString: 'documentationPage.blocktypes.paragraph.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.blocktypes.paragraph.text',
  },
  {
    type: BlockType.CODE,
    code: blocktypes.paragraph,
  },
  // example
  {
    type: BlockType.HEADLINE,
    translationString: 'documentationPage.blocktypes.example.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.blocktypes.example.text',
  },
  {
    type: BlockType.CODE,
    code: blocktypes.example,
  },
  // code
  {
    type: BlockType.HEADLINE,
    translationString: 'documentationPage.blocktypes.code.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.blocktypes.code.text',
  },
  {
    type: BlockType.CODE,
    code: blocktypes.code,
  },
  // api
  {
    type: BlockType.HEADLINE,
    translationString: 'documentationPage.blocktypes.api.title',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.blocktypes.api.text',
  },
  {
    type: BlockType.CODE,
    code: blocktypes.api,
  },
  {
    type: BlockType.SUBTITLE,
    translationString: 'documentationPage.apiOptionsTitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.apiOptions.text',
  },
  {
    type: BlockType.CODE,
    code: apiOptions,
  },
] as ApiDocsBlock[]
