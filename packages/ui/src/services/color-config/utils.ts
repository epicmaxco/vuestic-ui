import kebabCase from 'lodash/kebabCase.js'
import camelCase from 'lodash/camelCase.js'

export const cssVariableName = (colorName: string) => `--va-${kebabCase(colorName)}`

export const normalizeColorName = (colorName: string) => camelCase(colorName)
