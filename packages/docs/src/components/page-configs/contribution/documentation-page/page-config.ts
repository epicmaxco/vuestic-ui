import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import apiOptions from './api-options'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export const codeForCodeblock = '\'<div>Code string</div>\''
export const codeForListBlock = `
<ul>
    <li> Value of the list item 1 </li>
    <li> Value of the list item 2 </li>
</ul>`

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
  DocsHelper.code('DocsHelper.title(\'translation.path\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.title('translation.path'),

  DocsHelper.headline('documentationPage.blocktypes.subtitle.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.subtitle.text'),
  DocsHelper.code('DocsHelper.subtitle(\'translation.path\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.subtitle('translation.path'),

  DocsHelper.headline('documentationPage.blocktypes.headline.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.headline.text'),
  DocsHelper.code('DocsHelper.headline(\'translation.path\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.headline('translation.path'),

  DocsHelper.headline('documentationPage.blocktypes.paragraph.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.paragraph.text'),
  DocsHelper.code('DocsHelper.paragraph(\'translation.path\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.paragraph('translation.path'),

  DocsHelper.headline('documentationPage.blocktypes.list.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.list.text'),
  DocsHelper.code('DocsHelper.list([\'translation1.path\', \'translation2.path\'\])'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.list([
    'documentationPage.blocktypes.list.listExample1',
    'documentationPage.blocktypes.list.listExample2'
  ]),
  DocsHelper.paragraph('documentationPage.blocktypes.list.inCode'),
  DocsHelper.code(codeForListBlock),

  DocsHelper.headline('documentationPage.blocktypes.code.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.code.text'),
  DocsHelper.code(`DocsHelper.code(${codeForCodeblock})`),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.code(codeForCodeblock.slice(1,-1)),

  DocsHelper.headline('documentationPage.blocktypes.example.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.example.text'),
  DocsHelper.code('DocsHelper.example(\'va-component/ComponentName\')'),

  DocsHelper.headline('documentationPage.blocktypes.api.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.api.text'),
  DocsHelper.code('DocsHelper.api(VaComponent, apiOptions)'),

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
