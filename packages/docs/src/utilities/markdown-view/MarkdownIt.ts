// @ts-ignore
import MarkdownIt from 'markdown-it'
import { locale } from '../../helpers/I18nHelper'
import { setTargetBlankToLinks } from './set-target-blank-to-links'
import { setOriginLocationToRelativeLinks } from './set-origin-location-to-relative-links'

const md = new MarkdownIt({
  breaks: true,
  typographer: true,
  html: true,
})

md.options.currentLocale = locale

md.use(setTargetBlankToLinks)
  .use(setOriginLocationToRelativeLinks)

export default md
