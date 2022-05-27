import kebabCase from 'lodash/kebabCase'
import camelCase from 'lodash/camelCase'

export const cssVariableName = (colorName: string) => `--va-${kebabCase(colorName)}`

export const normalizeColorName = (colorName: string) => camelCase(colorName)
