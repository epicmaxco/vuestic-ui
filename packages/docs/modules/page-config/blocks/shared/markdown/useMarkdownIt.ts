import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
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

export const attributesOptions: AttributesOptions = {
  className: '',
}

export const useMarkdownIt = () => {
  const { locale } = useI18n()

  const localeOptions: LocaleOptions = {
    currentLocale: locale.value,
    externalLinkStartWith,
  }

  md.use(setOriginLocationToRelativeLinks, localeOptions)
    .use(setClassAttributeToExternalLinks, attributesOptions)
    .use(markdownItAttrs, {
      leftDelimiter: '[[',
      rightDelimiter: ']]',
    })

  watch(locale, () => {
    localeOptions.currentLocale = locale.value
  })

  return md
}
