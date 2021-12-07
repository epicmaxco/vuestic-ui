export type TableDataRow = string[];
export type TableData = TableDataRow[];
export type TableColumn = string | { title: string, type?: 'strong' | 'markdown' | 'code' | 'pre' | 'plain' | 'translationString' }
export type Table = {
  columns: TableColumn[],
  tableData: TableData
}
