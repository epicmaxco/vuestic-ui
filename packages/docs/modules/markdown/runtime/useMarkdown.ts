import { InjectionKey } from "vue"
import { marked } from 'marked';
import { fixTargetLinks } from "./plugins/external-links";
import { localizedLinkMarkedPlugin } from './plugins/localized-links'

let localizePlugin: null | ReturnType<typeof localizedLinkMarkedPlugin> = null

export const useMarkdownProvideKey = 'vuestic:markdown' as unknown as InjectionKey<ReturnType<typeof marked>>

export const useMarkdown = () => {
  const { locale } = useI18n()

  if (!localizePlugin) {
    localizePlugin = localizedLinkMarkedPlugin(locale)
    marked.use(localizePlugin)
  } else {
    marked.use(localizePlugin)
  }

  const parse = (markdown: string) => {
    return fixTargetLinks((marked.parse(markdown)).toString())
  }

  const parseInline = (markdown: string) => {
    return fixTargetLinks((marked.parseInline(markdown)).toString())
  }

  return { parse, parseInline }
}