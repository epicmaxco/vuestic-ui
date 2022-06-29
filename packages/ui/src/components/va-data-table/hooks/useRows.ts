import { Ref, computed } from 'vue'

import { getValueByPath } from '../../../services/utils'

import { DataTableColumnInternal, DataTableItem, DataTableCell, DataTableRow, DataTableItemKey } from '../types'

export const getItemKey = (source: any, itemTrackBy: string): DataTableItemKey => (
  getValueByPath(source, itemTrackBy) || source
)

interface useRowsProps {
  items: DataTableItem[]
  itemTrackBy: string
  [prop: string]: unknown
}

const buildTableCell = (
  rowIndex: number,
  rowKey: string,
  rowData: DataTableItem,
  column: DataTableColumnInternal,
): DataTableCell => {
  const source = getValueByPath(rowData, column.key)

  return {
    rowIndex,
    rowKey,
    rowData,
    column,
    source,
    value: source?.toString?.() || '',
  }
}

const buildTableRow = (
  source: DataTableItem,
  initialIndex: number,
  itemTrackBy: string,
  columns: DataTableColumnInternal[],
): DataTableRow => {
  const itemKey = getItemKey(source, itemTrackBy)

  return {
    initialIndex,
    itemKey,
    source,
    cells: columns.map(column => buildTableCell(initialIndex, itemKey, source, column)),
  }
}

export default function useRows (
  columns: Ref<DataTableColumnInternal[]>,
  props: useRowsProps,
) {
  const rowsComputed = computed(() => props.items
    .map((rawItem, index) => buildTableRow(rawItem, index, props.itemTrackBy, columns.value)))

  return {
    rowsComputed,
  }
}
