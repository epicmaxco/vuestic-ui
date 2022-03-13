export type TranslationString = string

export enum DocsBlockType {
  TITLE = 'TITLE',
  SUBTITLE = 'SUBTITLE',
  EXAMPLE = 'EXAMPLE'
}

type ComponentAttributes = Record<string, any>

export interface DocsBlock {
  type: DocsBlockType
  component: string,
  setup?: () => ComponentAttributes,
}
