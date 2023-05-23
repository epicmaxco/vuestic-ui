import { Renderer, Parser } from 'marked'
import { Ref } from 'vue'
export const externalLinkStartWith = ['http://', 'https://']

export function localizedLinkMarkedPlugin(locale: Ref<string>) {
  const renderer = new Renderer();
  const originalRenderer = renderer.link;

  renderer.link = function (href, title, text) {
    const isExternalLink = externalLinkStartWith.some((item) => href?.startsWith(item))

    if (isExternalLink) {
      return originalRenderer.call(renderer, href, title, text);
    }

    const normalizedHref = href?.startsWith('/')
      ? href.substring(1)
      : href

    const localePrefix = `${locale.value}/`

    if (normalizedHref?.startsWith(localePrefix)) {
      return originalRenderer.call(renderer, href, title, text);
    }

    return originalRenderer.call(renderer, '/' + localePrefix + href, title, text);
  }

  return { renderer };
}