export type LocaleOptions = {
  currentLocale: string,
} 

export const setOriginLocationToRelativeLinks = (md: any, localeOptions: LocaleOptions): void => {
  const defaultRender = md.renderer.rules.link_open || function(tokens: any, idx: number, options: any, env: any, self: any) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function (tokens: any, idx: number, options: any, env: any, self: any) {
    const aIndex = tokens[idx].attrIndex('href')

    if ((aIndex >= 0) && (tokens[idx].attrs[aIndex][1][0] === '/')) {
      tokens[idx].attrs[aIndex][1] = `${location.origin}/${localeOptions.currentLocale}${tokens[idx].attrs[aIndex][1]}`
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}
