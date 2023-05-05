import { InjectionKey } from "vue"
import { marked } from 'marked';
import { externalLinkMarkedPlugin } from "./plugins/external-links";
import { localizedLinkMarkedPlugin } from './plugins/localized-links'

let localizePlugin: null | ReturnType<typeof localizedLinkMarkedPlugin> = null
marked.use(externalLinkMarkedPlugin())

export const useMarkdownProvideKey = 'vuestic:markdown' as unknown as InjectionKey<ReturnType<typeof marked>>

export const useMarkdownIt = () => {
  const { locale } = useI18n()

  if (!localizePlugin) {
    localizePlugin = localizedLinkMarkedPlugin(locale)
    marked.use(localizePlugin)
  } else {
    marked.use(localizePlugin)
  }

  const parse = (markdown: string) => {
    return (marked(markdown)).toString()
  }

  const parseInline = (markdown: string) => {
    return (marked.parseInline(markdown)).toString()
  }

  return { parse, parseInline }
}