// @ts-ignore
import MarkdownIt from 'markdown-it'
import { locale } from '../../helpers/I18nHelper'
import { setTargetBlankToLinks } from './set-target-blank-to-links'
import { setOriginLocationToRelativeLinks, LocaleOptions } from './set-origin-location-to-relative-links'

const md = new MarkdownIt({
  breaks: true,
  typographer: true,
  html: true,
})

export const localeOptions: LocaleOptions = {
  currentLocale: locale,
}

md.use(setTargetBlankToLinks)
  .use(setOriginLocationToRelativeLinks, localeOptions)

export default md
