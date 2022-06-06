import { Ref, computed } from 'vue'
import { TableColumn, DataTableItem, DataTableCell, DataTableRow } from '../types'

interface useRowsProps {
  items: DataTableItem[]
  [prop: string]: unknown
}

const buildTableCell = (rowIndex: number, column: TableColumn, rowData: DataTableItem): DataTableCell => ({
  rowData,
  rowIndex,
  column,
  value: rowData[column.key]?.toString?.() || '',

  /** @deprecated */
  source: rowData[column.key],
})

const buildTableRow = (source: DataTableItem, initialIndex: number, columns: TableColumn[]): DataTableRow => ({
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
