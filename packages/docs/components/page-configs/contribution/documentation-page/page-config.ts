import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import { blocktypes, codeForCodeblock } from './block-types'
import apiOptions from './api-options'
import { DocsHelper } from '../../../../helpers/DocsHelper'
export default [
  DocsHelper.title('documentationPage.title'),
  DocsHelper.paragraph('documentationPage.description'),

  DocsHelper.headline('documentationPage.introduction.title'),
  DocsHelper.paragraph('documentationPage.introduction.description'),

  DocsHelper.subtitle('documentationPage.pageConfig.title'),
  DocsHelper.paragraph('documentationPage.pageConfig.generate'),
  DocsHelper.paragraph('documentationPage.pageConfig.description'),

  DocsHelper.headline('documentationPage.blocktypes.title.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.title.text'),
  DocsHelper.code(blocktypes.title),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.title('translation.path'),

  DocsHelper.headline('documentationPage.blocktypes.subtitle.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.subtitle.text'),
  DocsHelper.code(blocktypes.subtitle),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.subtitle('translation.path'),

  DocsHelper.headline('documentationPage.blocktypes.headline.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.headline.text'),
  DocsHelper.code(blocktypes.headline),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.headline('translation.path'),

  DocsHelper.headline('documentationPage.blocktypes.paragraph.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.paragraph.text'),
  DocsHelper.code(blocktypes.paragraph),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.paragraph('translation.path'),

  DocsHelper.headline('documentationPage.blocktypes.code.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.code.text'),
  DocsHelper.code(blocktypes.code),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.code(codeForCodeblock),

  DocsHelper.headline('documentationPage.blocktypes.example.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.example.text'),
  DocsHelper.code(blocktypes.example),

  DocsHelper.headline('documentationPage.blocktypes.api.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.api.text'),
  DocsHelper.code(blocktypes.api),

  {
    type: BlockType.SUBTITLE,
    translationString: 'documentationPage.apiOptionsTitle',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.apiOptions.text',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.apiOptions.version',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.apiOptions.local',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.apiOptions.hidden',
  },
  {
    type: BlockType.PARAGRAPH,
    translationString: 'documentationPage.apiOptions.types',
  },
  {
    type: BlockType.CODE,
    code: apiOptions,
  },
] as ApiDocsBlock[]
