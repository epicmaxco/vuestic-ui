import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { linkOptions, tableData, columns } from './options'
import {
  codeForCodeblock,
  codeForListBlock,
  linkOptionsBlock,
  tableDataBlock,
  apiOptions,
} from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('documentationPage.title'),
  block.paragraph('documentationPage.description'),

  block.headline('documentationPage.introduction.title'),
  block.paragraph('documentationPage.introduction.description'),

  block.subtitle('documentationPage.pageConfig.title'),
  block.paragraph('documentationPage.pageConfig.generate'),
  block.paragraph('documentationPage.pageConfig.description'),

  block.headline('documentationPage.blocktypes.title.title'),
  block.paragraph('documentationPage.blocktypes.title.text'),
  block.code('block.title(\'translation.path\')'),
  block.paragraph('documentationPage.compilesTo'),
  block.title('documentationPage.blocktypes.title.example'),

  block.headline('documentationPage.blocktypes.subtitle.title'),
  block.paragraph('documentationPage.blocktypes.subtitle.text'),
  block.code('block.subtitle(\'translation.path\')'),
  block.paragraph('documentationPage.compilesTo'),
  block.subtitle('documentationPage.blocktypes.subtitle.example'),

  block.headline('documentationPage.blocktypes.headline.title'),
  block.paragraph('documentationPage.blocktypes.headline.text'),
  block.code('block.headline(\'translation.path\')'),
  block.paragraph('documentationPage.compilesTo'),
  block.headline('documentationPage.blocktypes.headline.example'),

  block.headline('documentationPage.blocktypes.paragraph.title'),
  block.paragraph('documentationPage.blocktypes.paragraph.text'),
  block.code('block.paragraph(\'translation.path\')'),
  block.paragraph('documentationPage.compilesTo'),
  block.paragraph('documentationPage.blocktypes.paragraph.example'),

  block.headline('documentationPage.blocktypes.list.title'),
  block.paragraph('documentationPage.blocktypes.list.text'),
  block.code('block.list([\'translation1.path\', \'translation2.path\'])'),
  block.paragraph('documentationPage.compilesTo'),
  block.list([
    'documentationPage.blocktypes.list.listExample1',
    'documentationPage.blocktypes.list.listExample2',
  ]),
  block.paragraph('documentationPage.blocktypes.list.inCode'),
  block.code(codeForListBlock),

  block.headline('documentationPage.blocktypes.code.title'),
  block.paragraph('documentationPage.blocktypes.code.text'),
  block.code(`block.code(${codeForCodeblock})`),
  block.paragraph('documentationPage.compilesTo'),
  block.code(codeForCodeblock.slice(1, -1)),

  block.headline('documentationPage.blocktypes.example.title'),
  block.paragraph('documentationPage.blocktypes.example.text'),
  block.paragraph('documentationPage.blocktypes.example.aboutPath'),
  block.code('block.example(\'path/to/directory\', \'ComponentName\')'),

  block.headline('documentationPage.blocktypes.component.title'),
  block.paragraph('documentationPage.blocktypes.component.text'),
  block.code('block.component(\'path/to/directory\', \'ComponentName\')'),

  block.headline('documentationPage.blocktypes.api.title'),
  block.paragraph('documentationPage.blocktypes.api.text'),
  block.code('block.api(VaComponent, apiOptions)'),

  block.headline('documentationPage.apiOptionsTitle'),
  block.paragraph('documentationPage.apiOptions.text'),
  block.paragraph('documentationPage.apiOptions.hidden'),
  block.paragraph('documentationPage.apiOptions.types'),
  block.paragraph('documentationPage.apiOptions.version'),
  block.code(apiOptions),

  block.headline('documentationPage.blocktypes.table.title'),
  block.paragraph('documentationPage.blocktypes.table.text'),
  block.code(tableDataBlock),
  block.code('block.table(columns, tableData)'),
  block.paragraph('documentationPage.compilesTo'),
  block.table(columns, tableData),

  block.headline('documentationPage.blocktypes.link.title'),
  block.paragraph('documentationPage.blocktypes.link.text'),
  block.code(linkOptionsBlock),
  block.code(
    'block.link(\'translation.path\', \'/contribution/documentation-page#introduction\', options)',
  ),
  block.code(
    'block.link(\'translation.path\', \'/getting-started/configuration-guide#components-config\')',
  ),
  block.paragraph('documentationPage.compilesTo'),
  block.link(
    'documentationPage.blocktypes.link.exampleWithOptions',
    '/contribution/documentation-page#introduction',
    linkOptions,
  ),
  block.link(
    'documentationPage.blocktypes.link.example',
    '/getting-started/configuration-guide#components-config',
  ),

  block.headline('documentationPage.blocktypes.alert.title'),
  block.paragraph('documentationPage.blocktypes.alert.text'),
  block.code('block.alert(\'translation.path\', \'#ff0000\')'),
  block.paragraph('documentationPage.compilesTo'),
  block.alert('documentationPage.blocktypes.alert.example', '#ff0000'),
]

export default config
