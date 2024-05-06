import { SizesConfig } from '../theme'
import { cssVariableName } from '../../../utils/css-variables'
import { CSSProperties } from 'vue'
import { bemClassName } from '../../../utils/bem'
import { renderCSSRule } from '../../../utils/css'
import { ComponentConfig } from '../types'

const renderComponentStyles = (sizesConfig: SizesConfig<string, string>, componentName: string, scopeSelector?: string) => {
  return Object.entries(sizesConfig).reduce((acc, [size, sizePreset]) => {
    const { variables } = sizePreset || {}
    const definitions: CSSProperties = {}

    for (const property in variables) {
      definitions[cssVariableName({ componentName, property })] = variables[property]
    }

    const classSelector = `.${bemClassName({ block: componentName, modifier: size })}`

    const selector = scopeSelector ? `${scopeSelector} ${classSelector}` : classSelector

    acc += renderCSSRule(selector, definitions)

    return acc
  }, '')
}

export const renderComponentsStyles = (config: ComponentConfig, scopeSelector?: string) => {
  return Object.entries(config).reduce((styles, [componentName, componentConfig]) => {
    const sizesConfig: SizesConfig<string, string> | undefined = 'sizesConfig' in componentConfig ? componentConfig.sizesConfig : undefined

    if (sizesConfig) {
      styles += renderComponentStyles(sizesConfig, componentName, scopeSelector)
    }

    return styles
  }, '')
}
