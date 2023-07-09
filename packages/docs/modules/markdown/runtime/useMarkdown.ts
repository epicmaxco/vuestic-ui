import { marked } from 'marked';
import { fixTargetLinks } from "./plugins/external-links";

export const useMarkdown = () => {

  const parse = (markdown: string) => {
    return fixTargetLinks((marked.parse(markdown)).toString())
  }

  const parseInline = (markdown: string) => {
    return fixTargetLinks((marked.parseInline(markdown)).toString())
  }

  return { parse, parseInline }
}
