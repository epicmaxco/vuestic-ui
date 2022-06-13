import { Ref, computed } from 'vue'

import { DataTableColumnInternal, DataTableItem, DataTableCell, DataTableRow } from '../types'

interface useRowsProps {
  items: DataTableItem[]
  [prop: string]: unknown
}

const buildTableCell = (rowIndex: number, column: DataTableColumnInternal, rowData: DataTableItem): DataTableCell => ({
  rowIndex,
  rowData,
  column,
  source: rowData[column.key],
  value: rowData[column.key]?.toString?.() || '',
})

const buildTableRow = (source: DataTableItem, initialIndex: number, columns: DataTableColumnInternal[]): DataTableRow => ({
  source,
  initialIndex,
  cells: columns.map(column => buildTableCell(initialIndex, column, source)),
})

export default function useRows (
  columns: Ref<DataTableColumnInternal[]>,
  props: useRowsProps,
) {
  const rowsComputed = computed(() => {
    return props.items.map((rawItem, index) => buildTableRow(rawItem, index, columns.value))
  })

  return {
    rowsComputed,
  }
}
