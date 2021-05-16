export type TableData = string[][];
export type TableColumn = string | { title: string, type?: 'strong' | 'markdown' | 'code' | 'pre' | 'plain' | 'translationString' }

export { default as DocsTable } from './DocsTable.vue'
