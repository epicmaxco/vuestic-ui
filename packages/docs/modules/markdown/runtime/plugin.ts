// @ts-ignore
import MarkdownIt from 'markdown-it'
// @ts-ignore
import markdownItAttrs from 'markdown-it-attrs'
import {
  setOriginLocationToRelativeLinks,
} from './rules/set-origin-location-to-relative-links'
import { setClassAttributeToExternalLinks, AttributesOptions } from './rules/set-class-attribute-to-external-links'
import { useMarkdownProvideKey } from './useMarkdownIt';

const md = new MarkdownIt({
  breaks: true,
  typographer: true,
  html: true,
})

export const attributesOptions: AttributesOptions = {
  className: '',
}

export default defineNuxtPlugin((nuxtApp) => {
  const localeOptions = {
    // Reactive access to locale
    get currentLocale() { return nuxtApp.vueApp.config.globalProperties.$i18n.locale }
  }

  md.use(setOriginLocationToRelativeLinks, localeOptions)
    .use(setClassAttributeToExternalLinks, attributesOptions)
    .use(markdownItAttrs, {
      leftDelimiter: '[[',
      rightDelimiter: ']]',
    })

  nuxtApp.vueApp.provide(useMarkdownProvideKey, md)
})