export type TableDataRecord = string[]
export type TableData = TableDataRecord[];

export type TableColumn = string | { title: string, type?: 'strong' | 'markdown' | 'code' | 'pre' | 'plain' | 'translationString', style?: string }
export type TableColumns = TableColumn[]
