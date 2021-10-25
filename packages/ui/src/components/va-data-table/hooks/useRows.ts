import { Ref, computed } from 'vue'
import { TableColumn } from './useColumns'

export type ITableItem = Record<string, any>

// the inner representation of table cells
export interface TableCell {
  source: any;
  column: TableColumn;
  value: string;
  rowIndex: number;
}

// the inner representation of table rows
export interface TableRow {
  source: ITableItem;
  initialIndex: number;
  cells: TableCell[];
}

const buildTableCell = (rowIndex: number, column: TableColumn, source: any): TableCell => ({
  source,
  rowIndex,
  column,
  value: source?.toString?.() || '',
})

const buildTableRow = (source: ITableItem, initialIndex: number, columns: TableColumn[]): TableRow => ({
  source,
  initialIndex,
  cells: columns.map(column => buildTableCell(initialIndex, column, source[column.key])),
})

export default function useRows (
  rawItems: Ref<ITableItem[]>,
  columns: Ref<TableColumn[]>,
) {
  const rows = computed(() => {
    return rawItems.value.map((rawItem, index) => buildTableRow(rawItem, index, columns.value))
  })

  return {
    rows,
  }
}
