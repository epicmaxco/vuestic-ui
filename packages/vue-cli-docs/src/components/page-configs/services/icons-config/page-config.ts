import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { setupCodeExample, fa4FontCodeExample, aliasCodeExample } from './examples'
import { t, locale } from '../../../../helpers/i18nHelper'

const prefix = (text: string) => `iconsConfig.${text}`
const url = (text: string, href: string) => `[${t(text)}]()`
const readMoreLink = (text: string, href: string) =>
  DocsHelper.paragraph(`<b>${t(prefix('readMore'))} ${url(text, href)}</b>`)

export default [
  DocsHelper.title(prefix('title')),
  DocsHelper.paragraph(prefix('about')),

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
  DocsHelper.link(prefix('advancedFontsUsage'), `/${locale}/services/global-config`, { preText: 'Read more' }),

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
      ['iconClass', 'string | ((...regexGroups: string[]) => string) | undefined', 'You can specify class based on regex groups values from name.'],
      ['content', 'string | ((...regexGroups: string[]) => string | undefined) | undefined', 'You cab specify content inside icon tag.'],
      ['component', '`VueComponent | undefined`', 'You can render specific vue component instead of VaIcon tag.'],
      ['componentProps', '`Record<string, any> | ((...regexGroups: string[]) => Record<string, any>) | undefined`', 'You can specify which props will be bound to your custom component'],
      ['to', '`string | undefined`', 'Used in aliases as new name to search in icons config'],
      ['tag', '`string | undefined`', ''],
      ['color', '`string | undefined`', ''],
      ['rotation', '`number | string | undefined`', ''],
      ['spin', "`'clockwise' | 'counter-clockwise' | undefined`", ''],
      // ['', '', ''],
    ],
  ),
] as ApiDocsBlock[]

// export type ManualApiOptions = {
//   version?: VersionString;
//   props?: Record<string, ManualPropApiOptions>;
//   methods?: Record<string, ManualMethodApiOptions>;
//   events?: Record<string, ManualEventApiOptions>;
//   slots?: Record<string, ManualSlotApiOptions>;
// }
