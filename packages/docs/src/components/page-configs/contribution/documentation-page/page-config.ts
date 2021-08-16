import { BlockType, ApiDocsBlock } from '../../../../types/configTypes'
import apiOptions from './api-options'
import linkOptions from './link-options'
import { tableData, columns } from './table-options'
import { locale } from '../../../../helpers/I18nHelper'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export const codeForCodeblock = '\'<div>Code string</div>\''
export const codeForListBlock = `
<ul>
    <li> Value of the list item 1 </li>
    <li> Value of the list item 2 </li>
</ul>`
export const linkOptionsBlock = `options = {
  preText: 'prefix with **markdown** text',
  afterText: 'suffix',
}`
export const tableDataBlock = `
columns = [
  'col1',
  { title: 'col2', type: 'strong' },
  { title: 'col3', type: 'markdown' },
  { title: 'col4', type: 'code' },
]

tableData = [
  ['d1C1', 'd1C2', '[d1C3](https://en.wikipedia.org/wiki/Markdown)', 'd1C4'],
  ['d2C1', 'd2C2', '<mark>d2C3</mark>', 'd2C4'],
  ['d3C1', 'd3C2', '~~d3C3~~', 'd3C4'],
]`

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
  DocsHelper.code('DocsHelper.list([\'translation1.path\', \'translation2.path\'])'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.list([
    'documentationPage.blocktypes.list.listExample1',
    'documentationPage.blocktypes.list.listExample2',
  ]),
  DocsHelper.paragraph('documentationPage.blocktypes.list.inCode'),
  DocsHelper.code(codeForListBlock),

  DocsHelper.headline('documentationPage.blocktypes.code.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.code.text'),
  DocsHelper.code(`DocsHelper.code(${codeForCodeblock})`),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.code(codeForCodeblock.slice(1, -1)),

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

  DocsHelper.headline('documentationPage.blocktypes.table.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.table.text'),
  DocsHelper.code(`${tableDataBlock}`),
  DocsHelper.code('DocsHelper.table(columns, tableData)'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.table(columns, tableData),

  DocsHelper.headline('documentationPage.blocktypes.link.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.link.text'),
  DocsHelper.code(`${linkOptionsBlock}`),
  // eslint-disable-next-line no-template-curly-in-string
  DocsHelper.code("DocsHelper.link('translation.path', `/${locale}/contribution/documentation-page#translation-path`, options)"),
  // eslint-disable-next-line no-template-curly-in-string
  DocsHelper.code("DocsHelper.link('translation.path', `/${locale}/services/components-config`)"),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.link('translation.path', `/${locale}/contribution/documentation-page#translation-path`, linkOptions),
  DocsHelper.link('translation.path', `/${locale}/services/components-config`),

  DocsHelper.headline('documentationPage.blocktypes.alert.title'),
  DocsHelper.paragraph('documentationPage.blocktypes.alert.text'),
  DocsHelper.code('DocsHelper.alert(\'translation.path\', \'#ff0000\')'),
  DocsHelper.paragraph('documentationPage.compilesTo'),
  DocsHelper.alert('translation.path', '#ff0000'),
] as ApiDocsBlock[]
