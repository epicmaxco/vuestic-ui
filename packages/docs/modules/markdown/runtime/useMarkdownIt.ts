import { InjectionKey } from "vue"
import { marked } from 'marked';

export const useMarkdownProvideKey = 'vuestic:markdown' as unknown as InjectionKey<ReturnType<typeof marked>>

export const useMarkdownIt = () => {
  const parse = (markdown: string) => {
    return (marked(markdown)).toString()
  }

  return { parse }
}