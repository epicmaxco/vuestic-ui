type ComponentAttributes = Record<string, any>

export interface DocsBlock {
  component: string,
  setup?: () => ComponentAttributes,
}
