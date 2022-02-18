import { Ref, computed } from 'vue'
import { TableColumn, ITableItem, TableCell, TableRow } from '../types'

interface useRowsProps {
  items: ITableItem[]
  [prop: string]: unknown
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
