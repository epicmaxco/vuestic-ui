import { Ref, computed } from 'vue'

import { getValueByPath } from '../../../services/utils'

import { DataTableColumnInternal, DataTableItem, DataTableCell, DataTableRow } from '../types'

interface useRowsProps {
  items: DataTableItem[]
  [prop: string]: unknown
}

const buildTableCell = (rowIndex: number, column: DataTableColumnInternal, rowData: DataTableItem): DataTableCell => {
  const source = getValueByPath(rowData, column.key)
  return {
    rowIndex,
    rowData,
    column,
    source,
    value: source?.toString?.() || '',
  }
}

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
