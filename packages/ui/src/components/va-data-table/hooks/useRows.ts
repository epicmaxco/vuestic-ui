import { Ref, computed } from 'vue'
import { TableColumn, ITableItem, TableCell, TableRow } from '../types'

interface useRowsProps {
  items: ITableItem[]
  [prop: string]: unknown
}

const buildTableCell = (rowIndex: number, column: TableColumn, rowData: ITableItem): TableCell => ({
  rowData,
  /** @deprecated */
  source: rowData[column.key],
  rowIndex,
  column,
  value: rowData[column.key]?.toString?.() || '',
})

const buildTableRow = (source: ITableItem, initialIndex: number, columns: TableColumn[]): TableRow => ({
  source,
  initialIndex,
  cells: columns.map(column => buildTableCell(initialIndex, column, source)),
})

export default function useRows (
  columns: Ref<TableColumn[]>,
  props: useRowsProps,
) {
  const rowsComputed = computed(() => {
    return props.items.map((rawItem, index) => buildTableRow(rawItem, index, columns.value))
  })

  return {
    rowsComputed,
  }
}
