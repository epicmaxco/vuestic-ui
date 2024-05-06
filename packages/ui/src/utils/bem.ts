import kebabCase from 'lodash/kebabCase'

interface BEMClassNameComponents {
  prefix?: string;
  block: string;
  element?: string;
  modifier?: string;
}

export const bemClassName = (components: BEMClassNameComponents) => {
  const { prefix = 'va', block, element, modifier } = components

  return `${prefix}-${kebabCase(block).replace(/^va-/, '')}${element ? `__${kebabCase(element)}` : ''}${modifier ? `--${kebabCase(modifier)}` : ''}`
}
