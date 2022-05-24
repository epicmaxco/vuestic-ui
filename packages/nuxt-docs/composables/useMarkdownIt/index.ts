import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import { setClassAttributeToExternalLinks, AttributesOptions } from './plugins/set-class-attribute-to-external-links'
import {
  setOriginLocationToRelativeLinks,
  LocaleOptions,
  ExternalLinkStartWith,
} from './plugins/set-origin-location-to-relative-links'

const externalLinkStartWith: ExternalLinkStartWith = ['http://', 'https://']

type OptionalAll<T extends Record<string, unknown>> = {
  [Property in keyof T]?: T[Property];
};

export const useMarkdownIt = (pluginOptions: {
  locale?: OptionalAll<LocaleOptions>,
  attributes?:OptionalAll<AttributesOptions>
} = {}) => {
  const md = new MarkdownIt({
    breaks: true,
    typographer: true,
    html: true,
  })

  const localeOptions: LocaleOptions = {
    currentLocale: 'en',
    externalLinkStartWith,
    ...pluginOptions.locale,
  }

  const attributesOptions: AttributesOptions = {
    className: '',
    ...pluginOptions.attributes
  }

  md.use(setOriginLocationToRelativeLinks, localeOptions)
    .use(setClassAttributeToExternalLinks, attributesOptions)
    .use(markdownItAttrs, {
      leftDelimiter: '[[',
      rightDelimiter: ']]',
    })

  return md
}
