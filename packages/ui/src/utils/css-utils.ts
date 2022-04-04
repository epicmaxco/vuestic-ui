export const safeCSSLength = (length: string | number) => (
  typeof length === 'number' ? `${length}px` : length
)
