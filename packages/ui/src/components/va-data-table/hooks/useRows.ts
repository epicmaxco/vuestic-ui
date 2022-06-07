import { Ref, computed } from 'vue'
import { DataTableColumn, DataTableItem, DataTableCell, DataTableRow } from '../types'

interface useRowsProps {
  items: DataTableItem[]
  [prop: string]: unknown
}

const buildTableCell = (rowIndex: number, column: DataTableColumn, rowData: DataTableItem): DataTableCell => ({
  rowData,
  /** @deprecated */
  source: rowData[column.key],
  rowIndex,
  column,
  value: rowData[column.key]?.toString?.() || '',
})

const buildTableRow = (source: DataTableItem, initialIndex: number, columns: DataTableColumn[]): DataTableRow => ({
  source,
  initialIndex,
  cells: columns.map(column => buildTableCell(initialIndex, column, source)),
})

export default function useRows (
  columns: Ref<DataTableColumn[]>,
  props: useRowsProps,
) {
  const rowsComputed = computed(() => {
    return props.items.map((rawItem, index) => buildTableRow(rawItem, index, columns.value))
  })

  return {
    rowsComputed,
  }
}
