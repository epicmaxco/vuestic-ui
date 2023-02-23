import { Ref, ref, computed, ExtractPropTypes } from 'vue'

import { useItemsProp, useItemsTrackByProp } from './useCommonProps'

import { getValueByPath } from '../../../utils/value-by-key'

import type {
  DataTableColumnInternal,
  DataTableItem,
  DataTableCell,
  DataTableRow,
  DataTableItemKey,
} from '../types'

export const getItemKey = (source: DataTableItem, itemsTrackBy: string | ((item: DataTableItem) => any)): DataTableItemKey => (
  typeof itemsTrackBy === 'function'
    ? itemsTrackBy(source)
    : getValueByPath(source, itemsTrackBy) || source
)

export const useRowsProps = {
  ...useItemsProp,
  ...useItemsTrackByProp,
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
  itemsTrackBy: string | ((item: DataTableItem) => any),
  columns: DataTableColumnInternal[],
): DataTableRow => {
  const itemKey = getItemKey(source, itemsTrackBy)

  return {
    initialIndex,
    itemKey,
    source,
    cells: columns.map(column => buildTableCell(initialIndex, itemKey, source, column)),
  }
}

export const useRows = (
  columns: Ref<DataTableColumnInternal[]>,
  props: ExtractPropTypes<typeof useRowsProps>,
) => {
  const expandedRowDetails = ref<Record<number, boolean>>({})

  const rowsComputed = computed(() => props.items
    .map((rawItem, index) => ({
      ...buildTableRow(rawItem, index, props.itemsTrackBy, columns.value),
      toggleRowDetails: (show?: boolean) => {
        if (typeof show === 'boolean') {
          expandedRowDetails.value[index] = show
        } else {
          expandedRowDetails.value[index] = !expandedRowDetails.value[index]
        }
      },
      isRowDetailsVisible: !!expandedRowDetails.value[index],
    })))

  return {
    rowsComputed,
  }
}
