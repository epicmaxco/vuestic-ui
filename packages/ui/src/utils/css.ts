const CSS_UNITS = ['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax']

const CSS_VALUE_REGEX = new RegExp(`^[\\d]+${CSS_UNITS.join('|')}$`)

export const isCSSSizeValue = (value: string) => CSS_VALUE_REGEX.test(value)

export const isCSSVariable = (strColor: string): boolean => /var\(--.+\)/.test(strColor)

export const safeCSSLength = (length: string | number) => (
  typeof length === 'number' ? `${length}px` : length
)
