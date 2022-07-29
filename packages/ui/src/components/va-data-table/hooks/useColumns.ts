import { computed } from 'vue'
import startCase from 'lodash/startCase.js'
import merge from 'lodash/merge.js'

import { warn } from '../../../services/utils'
import type {
  DataTableColumnSource,
  DataTableColumnInternal,
  DataTableItem,
  DataTableSortingOptions,
} from '../types'

interface useColumnsProps {
  columns: DataTableColumnSource[]
  items: DataTableItem[]
  sortingOptions: DataTableSortingOptions
  [prop: string]: unknown
}

export const sortingOptionsValidator = (options: DataTableSortingOptions) => {
  const isAllowedOptionsLength = options.length === 2 || options.length === 3
  const isAvailableOptions = options.every((option) => ['asc', 'desc', null].includes(option))
  const isUniqueOptions = (options.length === new Set(options).size)

  return isAllowedOptionsLength && isAvailableOptions && isUniqueOptions
}

export const buildTableColumn = (
  source: DataTableColumnSource,
  initialIndex: number,
  props: useColumnsProps,
): DataTableColumnInternal => {
  const input = typeof source === 'string' ? { key: source } : source

  const isValidOptions = input.sortingOptions
    ? sortingOptionsValidator(input.sortingOptions)
    : true

  if (!isValidOptions) {
    warn(`The "sortingOptions" array in the column with "${input.key}" key is invalid. For this column, the "sortingOptions" value is taken as for the table: ${JSON.stringify(props.sortingOptions)}.`)
  }

  return {
    source,
    initialIndex,
    key: input.key,
    name: input.name || input.key,
    label: input.label || startCase(input.key),
    thTitle: input.thTitle || input.headerTitle || input.label || startCase(input.key),
    sortable: input.sortable || false,
    sortingFn: input.sortingFn,
    sortingOptions: (isValidOptions && input.sortingOptions) || props.sortingOptions,
    thAlign: input.thAlign || input.alignHead || 'left',
    thVerticalAlign: input.thVerticalAlign || input.verticalAlignHead || 'middle',
    tdAlign: input.tdAlign || input.align || 'left',
    tdVerticalAlign: input.tdVerticalAlign || input.verticalAlign || 'middle',
    width: input.width,
    tdClass: input.tdClass || input.classes,
    thClass: input.thClass || input.headerClasses,
    tdStyle: input.tdStyle || input.style,
    thStyle: input.thStyle || input.headerStyle,
  }
}

const buildColumnsFromItems = (props: useColumnsProps) => {
  return Object.keys(merge({}, ...props.items)).map((item, index) => buildTableColumn(item, index, props))
}

const buildNormalizedColumns = (props: useColumnsProps) => {
  return props.columns.map((item, index) => buildTableColumn(item, index, props))
}

export default function useColumns (props: useColumnsProps) {
  const columnsComputed = computed(() => {
    if (props.columns.length === 0) {
      // if no column definitions provided then build them based on provided rawItems
      // e.g. if provided items look like `[{a: 1}, {b: 2}]` then there should be 2 columns: A and B
      return buildColumnsFromItems(props)
    } else {
      return buildNormalizedColumns(props)
    }
  })

  return {
    columnsComputed,
  }
}
