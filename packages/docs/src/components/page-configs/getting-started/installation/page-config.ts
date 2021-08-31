import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import {
  installation,
  quickStart,
  fontInstallationCSS,
  fontInstallationHTML,
  cliPrepare,
  treeShakingExample,
  treeShakingPluginExample,
} from './code-examples'

const config: ApiDocsBlock[] = [
  DocsHelper.title('installation.title'),
  DocsHelper.paragraph('installation.description'),
  DocsHelper.subtitle('installation.manual.title'),
  DocsHelper.paragraph('installation.manual.subtitle'),
  DocsHelper.paragraph('installation.manual.prerequisites'),
  DocsHelper.list(['installation.manual.node', 'installation.manual.npm']),
  DocsHelper.paragraph('installation.manual.afterCheck'),
  DocsHelper.code(installation, 'bash'),

  DocsHelper.headline('installation.fonts.title'),
  DocsHelper.paragraph('installation.fonts.description'),
  DocsHelper.paragraph('installation.fonts.htmlExampleTitle'),
  DocsHelper.code(fontInstallationHTML, 'html'),
  DocsHelper.paragraph('installation.fonts.cssExampleTitle'),
  DocsHelper.code(fontInstallationCSS),

  DocsHelper.headline('installation.quickStart.title'),
  DocsHelper.paragraph('installation.quickStart.description'),
  DocsHelper.code(quickStart),

  DocsHelper.subtitle('installation.cli.title'),
  DocsHelper.paragraph('installation.cli.description'),
  DocsHelper.alert('installation.cli.attention', 'warning'),
  DocsHelper.paragraph('installation.cli.prepare'),
  DocsHelper.code(cliPrepare, 'bash'),
  DocsHelper.paragraph('installation.cli.upgrade'),
  DocsHelper.paragraph('installation.cli.codeAnnotation'),
  DocsHelper.code('vue add vuestic-ui', 'bash'),

  DocsHelper.subtitle('installation.treeShaking.title'),
  DocsHelper.paragraph('installation.treeShaking.description'),

  DocsHelper.paragraph('installation.treeShaking.example.title'),
  DocsHelper.code(treeShakingExample),
  DocsHelper.paragraph('installation.treeShaking.example.footer'),

  DocsHelper.paragraph('installation.treeShaking.plugins.title'),
  DocsHelper.list([
    'installation.treeShaking.plugins.GlobalConfigPlugin',
    'installation.treeShaking.plugins.ColorHelpersPlugin',
    'installation.treeShaking.plugins.ToastInstall',
    'installation.treeShaking.plugins.DropdownPopperSubplugin',
  ]),

  DocsHelper.paragraph('installation.treeShaking.plugins.example.title'),
  DocsHelper.code(treeShakingPluginExample),

  DocsHelper.alert('installation.treeShaking.attention.cssLoader', 'info'),
]

export default config
