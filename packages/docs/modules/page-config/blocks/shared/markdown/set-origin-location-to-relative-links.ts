export const externalLinkStartWith = ['http://', 'https://']

export type LocaleOptions = {
  currentLocale: string;
};

export const setOriginLocationToRelativeLinks = (
  md: any,
  localeOptions: LocaleOptions,
): void => {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens: any, idx: number, options: any, env: any, self: any) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.link_open = function (
    tokens: any,
    idx: number,
    options: any,
    env: any,
    self: any,
  ) {
    const token = tokens[idx]

    if (token.attrIndex('href') < 0) {
      return defaultRender(tokens, idx, options, env, self)
    }

    const hrefAttrValue: string = token.attrGet('href')

    if (hrefAttrValue.startsWith(`/${localeOptions.currentLocale}/`)) {
      return defaultRender(tokens, idx, options, env, self)
    }

    const isExternalLink = externalLinkStartWith.some((item) => hrefAttrValue.startsWith(item))

    if (isExternalLink) {
      return defaultRender(tokens, idx, options, env, self)
    }

    const normalizedHref = hrefAttrValue.startsWith('/')
      ? hrefAttrValue.substring(1)
      : hrefAttrValue

    token.attrSet(
      'href',
      `/${localeOptions.currentLocale}/${normalizedHref}`,
    )

    return defaultRender(tokens, idx, options, env, self)
  }
}
