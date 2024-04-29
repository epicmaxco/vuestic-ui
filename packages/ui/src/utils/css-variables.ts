import kebabCase from 'lodash/kebabCase'

interface CSSVariableNameComponents {
  prefix?: string;
  componentName?: string;
  state?: string;
  nestedElement?: string;
  size?: string;
  property: string
}

export function cssVariableName(property: string): string;
export function cssVariableName(name: CSSVariableNameComponents): string;
export function cssVariableName (arg: string | CSSVariableNameComponents) {
  const { prefix = 'va', componentName, state, nestedElement, size, property }: CSSVariableNameComponents = typeof arg === 'string' ? { property: arg } : arg

  const name = [componentName, state, nestedElement, size, property].map(kebabCase).filter(Boolean).join('-')

  return `--${prefix}-${name.replace(/^va-/, '')}`
}
