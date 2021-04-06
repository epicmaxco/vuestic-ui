export type TableData = string[][];
export type TableColum = string | { title: string, type?: 'strong' | 'markdown' | 'code' | 'pre' | 'plain' }

export { default as DocsTable } from './DocsTable.vue'
