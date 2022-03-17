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

const buildTableCell = (rowIndex: number, column: TableColumn, source: ITableItem): TableCell => ({
  source,
  rowIndex,
  column,
  value: source[column.key]?.toString?.() || '',
})

const buildTableRow = (source: ITableItem, initialIndex: number, columns: TableColumn[]): TableRow => ({
  source,
  initialIndex,
  cells: columns.map(column => buildTableCell(initialIndex, column, source)),
})

export default function useRows (
  rawItems: Ref<ITableItem[]>,
  columns: Ref<TableColumn[]>,
) {
  const rawRows = computed(() => {
    return rawItems.value.map((rawItem, index) => buildTableRow(rawItem, index, columns.value))
  })

  return {
    rawRows,
  }
}
