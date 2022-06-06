import { computed } from 'vue'
import startCase from 'lodash/startCase.js'
import merge from 'lodash/merge.js'
import { DataTableColumnSource, TableColumn, DataTableItem } from '../types'

interface useColumnsProps {
  columns: DataTableColumnSource[]
  items: DataTableItem[]
  [prop: string]: unknown
}

export const buildTableColumn = (source: DataTableColumnSource, initialIndex: number): TableColumn => {
  const input = typeof source === 'string' ? { key: source } : source

  return {
    source,
    initialIndex,
    key: input.key,
    label: input.label || startCase(input.key),
    headerTitle: input.headerTitle || input.label || startCase(input.key),
    sortable: input.sortable || false,
    sortingFn: input.sortingFn,
    alignHead: input.alignHead || 'left',
    verticalAlignHead: input.verticalAlignHead || 'middle',
    align: input.align || 'left',
    verticalAlign: input.verticalAlign || 'middle',
    width: input.width,
    class: input.class || input.classes,
    headerClass: input.headerClass || input.headerClasses,
    style: input.style,
    headerStyle: input.headerStyle,
  }
}

const buildColumnsFromItems = (items: DataTableItem[]) => {
  return Object.keys(merge({}, ...items)).map(buildTableColumn)
}

const buildNormalizedColumns = (columns: DataTableColumnSource[]) => {
  return columns.map(buildTableColumn)
}

export default function useColumns (props: useColumnsProps) {
  const columnsComputed = computed(() => {
    if (props.columns.length === 0) {
      // if no column definitions provided then build them based on provided rawItems
      // e.g. if provided items look like `[{a: 1}, {b: 2}]` then there should be 2 columns: A and B
      return buildColumnsFromItems(props.items)
    } else {
      return buildNormalizedColumns(props.columns)
    }
  })

  return {
    columnsComputed,
  }
}
