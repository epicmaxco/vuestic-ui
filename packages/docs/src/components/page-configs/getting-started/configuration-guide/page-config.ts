import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import {
  colorsConfig,
  iconsInstall,
  iconsConfig,
  componentsConfig,
} from './code-examples'

const config: ApiDocsBlock[] = [
  DocsHelper.title('configurationGuide.title'),
  DocsHelper.paragraph('configurationGuide.description'),
  DocsHelper.subtitle('configurationGuide.colors.title'),
  DocsHelper.paragraph('configurationGuide.colors.description'),
  DocsHelper.code(colorsConfig),
  DocsHelper.link('configurationGuide.readMore', '/services/colors-config'),

  DocsHelper.subtitle('configurationGuide.icons.title'),
  DocsHelper.paragraph('configurationGuide.icons.description'),
  DocsHelper.code(iconsInstall, 'bash'),

  DocsHelper.headline('configurationGuide.icons.subtitle'),
  DocsHelper.paragraph('configurationGuide.icons.subDescription'),
  DocsHelper.code(iconsConfig),
  DocsHelper.link('configurationGuide.readMore', '/services/icons-config'),

  DocsHelper.subtitle('configurationGuide.components.title'),
  DocsHelper.paragraph('configurationGuide.components.intro'),
  DocsHelper.paragraph('configurationGuide.components.description'),
  DocsHelper.example('config/PageConfigButtonDefault', { hideCode: true }),
  DocsHelper.paragraph('configurationGuide.components.action'),
  DocsHelper.code(componentsConfig),
  DocsHelper.paragraph('configurationGuide.components.result'),
  DocsHelper.example('config/PageConfigButton', { hideCode: true }),
  DocsHelper.paragraph('configurationGuide.components.example'),
  DocsHelper.paragraph('configurationGuide.components.more'),
  DocsHelper.link('configurationGuide.readMore', '/services/components-config'),
]

export default config
