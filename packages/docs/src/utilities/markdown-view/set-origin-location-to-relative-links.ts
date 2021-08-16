export type ExternalLinkStartWith = Array<string>

export type LocaleOptions = {
  currentLocale: string,
  externalLinkStartWith: ExternalLinkStartWith,
} 

export const setOriginLocationToRelativeLinks = (md: any, localeOptions: LocaleOptions): void => {
  const defaultRender = md.renderer.rules.link_open || function(tokens: any, idx: number, options: any, env: any, self: any) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function (tokens: any, idx: number, options: any, env: any, self: any) {
    const token = tokens[idx]

    if (token.attrIndex('href') >= 0) {
      const hrefAttrValue: string = token.attrGet('href')
  
      const isInternalLink = localeOptions.externalLinkStartWith.reduce((is, item) => {
        if (hrefAttrValue.startsWith(item)) {
          return is = false
        }
        return is
      }, true)
      
      if (isInternalLink) {
        const normalizedHref = hrefAttrValue.startsWith('/')
          ? hrefAttrValue.substring(1)
          : hrefAttrValue

        token.attrSet('href' ,`${location.origin}/${localeOptions.currentLocale}/${normalizedHref}`)
      }
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}
