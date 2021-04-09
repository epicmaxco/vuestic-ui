import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { setupCodeExample, fa4FontCodeExample, aliasCodeExample } from './examples'
import { locale } from '../../../../helpers/I18nHelper'

const prefix = (text: string) => `iconsConfig.${text}`

export default [
  DocsHelper.title(prefix('title')),
  DocsHelper.paragraph(prefix('about')),
  DocsHelper.link(prefix('readBeforeStart'), `/${locale}/ui-elements/icon`),

  // Problem
  DocsHelper.paragraph(prefix('problemDefinition')),
  DocsHelper.paragraph(prefix('materialIconsExample')),
  DocsHelper.code(`
    <span class="material-icons">
      star
    </span>
  `),

  DocsHelper.paragraph(prefix('fontAwesomeExample')),
  DocsHelper.code(`
    <i class="fas fa-star"></i>
  `),
  DocsHelper.paragraph(prefix('reasonToUseIconsConfig')),

  DocsHelper.subtitle(prefix('fonts')),
  DocsHelper.paragraph(prefix('fontExplanation')),
  DocsHelper.headline(prefix('fontNamePatter')),
  DocsHelper.paragraph(prefix('aboutFontPattern')),
  DocsHelper.example('icons-config/font'),

  DocsHelper.headline(prefix('example')),
  DocsHelper.paragraph(prefix('fontAwesomeExampleTitle')),
  DocsHelper.code(fa4FontCodeExample),
  DocsHelper.paragraph(prefix('fontAwesomeExampleExplanation')),
  DocsHelper.paragraph(prefix('flagExampleTitle')),
  DocsHelper.paragraph(prefix('flagExampleExplanation')),
  DocsHelper.paragraph('<br />'),
  DocsHelper.link(prefix('advancedFontsUsage'), `/${locale}/services/global-config`, { preText: prefix('readMore') }),

  DocsHelper.subtitle(prefix('aliases')),
  DocsHelper.paragraph(prefix('aliasExplanation')),
  DocsHelper.paragraph(prefix('aliasExampleTitle')),
  DocsHelper.headline(prefix('example')),
  DocsHelper.code(aliasCodeExample),
  DocsHelper.paragraph(prefix('aliasVuesticExampleExplanation')),
  DocsHelper.paragraph(prefix('aliasTwitterExampleExplanation')),

  DocsHelper.subtitle(prefix('setup')),
  DocsHelper.paragraph(prefix('setupExplanation')),
  DocsHelper.code(setupCodeExample),

  DocsHelper.subtitle(prefix('iconConfigAPI')),

  DocsHelper.table(
    ['Prop', { title: 'Type', type: 'code' }, 'Description'],
    [
      ['name', 'string | RegExp', 'VaIcon name template'],
      ['iconClass', 'string | ((...dynamicSegments: string[]) => string) | undefined', 'You can specify class based on regex groups values from name.'],
      ['content', 'string | ((...dynamicSegments: string[]) => string | undefined) | undefined', 'You cab specify content inside icon tag.'],
      ['component', '`VueComponent | undefined`', 'You can render specific vue component instead of VaIcon tag.'],
      ['componentProps', '`Record<string, any> | ((...dynamicSegments: string[]) => Record<string, any>) | undefined`', 'You can specify which props will be bound to your custom component'],
      ['to', '`string | undefined`', 'Used in aliases as new name to search in icons config'],
      ['tag', '`string | undefined`', ''],
      ['color', '`string | undefined`', ''],
      ['rotation', '`number | string | undefined`', ''],
      ['spin', "`'clockwise' | 'counter-clockwise' | undefined`", ''],
      // ['', '', ''],
    ],
  ),
] as ApiDocsBlock[]
