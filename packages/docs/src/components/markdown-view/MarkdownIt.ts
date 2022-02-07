// @ts-ignore
import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import { locale } from '../../locales/i18n'
import { setClassAttributeToExternalLinks, AttributesOptions } from './set-class-attribute-to-external-links'
import {
  setOriginLocationToRelativeLinks,
  LocaleOptions,
  ExternalLinkStartWith,
} from './set-origin-location-to-relative-links'

const md = new MarkdownIt({
  breaks: true,
  typographer: true,
  html: true,
})

export const externalLinkStartWith: ExternalLinkStartWith = ['http://', 'https://']

export const localeOptions: LocaleOptions = {
  currentLocale: locale,
  externalLinkStartWith,
}

export const attributesOptions: AttributesOptions = {
  className: '',
}

md.use(setOriginLocationToRelativeLinks, localeOptions)
  .use(setClassAttributeToExternalLinks, attributesOptions)
  .use(markdownItAttrs, {
    leftDelimiter: '[[',
    rightDelimiter: ']]',
  })

export default md
