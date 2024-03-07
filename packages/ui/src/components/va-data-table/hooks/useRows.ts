import { Ref, ref, computed, ExtractPropTypes } from 'vue'

import { createItemsProp, useItemsTrackByProp } from './useCommonProps'

import { getValueByPath } from '../../../utils/value-by-key'

import type {
  DataTableColumnInternal,
  DataTableItem,
  DataTableCell,
  DataTableRow,
  DataTableItemKey,
  DataTableRowData,
} from '../types'

export const getItemKey = <T extends Record<string, any>>(source: DataTableItem<T>, itemsTrackBy: string | ((item: DataTableItem<T>) => any)): DataTableItemKey => (
  typeof itemsTrackBy === 'function'
    ? itemsTrackBy(source)
    : getValueByPath(source, itemsTrackBy) || source
)

export const createRowsProps = <T extends Record<string, any>>() => ({
  ...createItemsProp<T>(),
  ...useItemsTrackByProp,
})

const buildTableCell = <Item extends DataTableItem>(
  rowIndex: number,
  rowKey: string,
  rowData: DataTableRowData<Item>,
  column: DataTableColumnInternal,
): DataTableCell<Item> => {
  const source = getValueByPath(rowData, column.key)

  return {
    rowIndex,
    rowKey,
    rowData,
    column,
    source: source as string,
    value: source?.toString?.() || '',
  }
}

const buildTableRow = <Item extends DataTableItem>(
  source: DataTableItem<Item>,
  initialIndex: number,
  itemsTrackBy: string | ((item: DataTableItem<Item>) => any),
  columns: DataTableColumnInternal[],
): Omit<DataTableRow<Item>, 'toggleRowDetails' | 'isExpandableRowVisible'> => {
  const itemKey = getItemKey(source, itemsTrackBy)

  return {
    initialIndex,
    itemKey,
    source,
    cells: columns.map(column => buildTableCell(initialIndex, itemKey, source, column)),
    rowData: source,
  }
}

type RowsProps<Item> = Omit<ExtractPropTypes<ReturnType<typeof createRowsProps>>, 'items'> & {
  items: Item[]
}

export const useRows = <Item extends Record<string, any>>(
  columns: Ref<DataTableColumnInternal[]>,
  props: RowsProps<Item>,
) => {
  const expandableRows = ref<Record<number, boolean>>({})

  const rowsComputed = computed(() => props.items
    .map((rawItem, index) => ({
      ...buildTableRow<Item>(rawItem, index, props.itemsTrackBy, columns.value),
      toggleRowDetails: (show?: boolean) => {
        if (typeof show === 'boolean') {
          expandableRows.value[index] = show
        } else {
          expandableRows.value[index] = !expandableRows.value[index]
        }
      },
      isExpandableRowVisible: !!expandableRows.value[index],
    })))

  return {
    rowsComputed,
  }
}
