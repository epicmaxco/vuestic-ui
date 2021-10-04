export type AttributesOptions = {
  className: string,
}

export const setClassAttributeToExternalLinks = (md: any, attributesOptions: AttributesOptions): void => {
  const defaultRender = md.renderer.rules.link_open || function (tokens: any, idx: number, options: any, env: any, self: any) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function (tokens: any, idx: number, options: any, env: any, self: any) {
    const token = tokens[idx]

    if (token.attrIndex('target') >= 0) {
      const isExternalLink = (token.attrGet('target') === '_blank')

      if (isExternalLink) {
        token.attrJoin('class', attributesOptions.className)
      }
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}
