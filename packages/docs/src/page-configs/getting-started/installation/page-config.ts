import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import {
  installationObject,
  quickStart,
  fontInstallationCSS,
  fontInstallationHTML,
  cliPrepare,
} from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('installation.title'),
  block.paragraph('installation.description'),

  block.subtitle('installation.cli.title'),
  block.paragraph('installation.cli.description'),
  block.alert('installation.cli.attention', 'warning'),
  block.paragraph('installation.cli.prepare'),
  block.code(cliPrepare, 'bash'),
  block.paragraph('installation.cli.upgrade'),
  block.paragraph('installation.cli.codeAnnotation'),
  block.code('vue add vuestic-ui', 'bash'),

  block.subtitle('installation.manual.title'),
  block.paragraph('installation.manual.subtitle'),
  block.paragraph('installation.manual.prerequisites'),
  block.list(['installation.manual.node', 'installation.manual.npm']),
  block.paragraph('installation.manual.afterCheck'),
  block.code(installationObject, 'bash'),

  block.headline('installation.fonts.title'),
  block.paragraph('installation.fonts.description'),
  block.paragraph('installation.fonts.htmlExampleTitle'),
  block.code(fontInstallationHTML, 'html'),
  block.paragraph('installation.fonts.cssExampleTitle'),
  block.code(fontInstallationCSS),

  block.headline('installation.quickStart.title'),
  block.paragraph('installation.quickStart.description'),
  block.code(quickStart),

  block.headline('installation.migrationGuide.title'),
  block.collapse('1.4 -> 1.5', [
    block.subtitle('installation.migrationGuide.1_5.components'),
    block.headline('VaButton'),
    block.paragraph('installation.migrationGuide.1_5.button'),
    block.headline('VaCheckbox'),
    block.paragraph('installation.migrationGuide.1_5.checkbox'),
    block.subtitle('installation.migrationGuide.1_5.services'),
    block.headline('installation.migrationGuide.1_5.colors'),
    block.alert('installation.migrationGuide.1_5.colors_0', 'info'),
    block.paragraph('installation.migrationGuide.1_5.colors_1'),
    block.paragraph('installation.migrationGuide.1_5.colors_2'),
    block.subtitle('installation.migrationGuide.1_5.styles'),
    block.paragraph('installation.migrationGuide.1_5.stylesDescription'),
    block.paragraph('installation.migrationGuide.1_5.typography_1'),
  ]),

  block.subtitle('installation.codesandbox.title'),
  block.component('OpenCodeSandbox'),

  // block.alert('installation.treeShaking.attention.cssLoader', 'info'),
]

export default config
