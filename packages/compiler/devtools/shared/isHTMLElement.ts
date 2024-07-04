export const isHTMLElement = (value: unknown): value is HTMLElement => {
  return value instanceof HTMLElement
}