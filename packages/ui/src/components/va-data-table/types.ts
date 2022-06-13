import { StringWithAutocomplete } from '../../types/string-with-autocomplete'

export type DataTableAlignOptions = StringWithAutocomplete<'left' | 'center' | 'right'>
export type DataTableVerticalAlignOptions = StringWithAutocomplete<'top' | 'middle' | 'bottom'>

export type DataTableClassesOptions = string | string[] | (() => string | string[])
export type DataTableStyleOptions = Record<string, any> | (() => Record<string, any>)

// provided column definitions (<va-data-table `:columns="myColumns"` />)
// should look like an array of the following objects (and/or strings)
export interface DataTableColumn {
  key: string // name of an item's property
  label?: string // what to display in the respective heading
  headerTitle?: string // <th>'s `title` attribute's value
  sortable?: boolean // whether the table can be sorted by that column
  sortingFn?: (a: any, b: any) => number // a custom sorting function. `a` and `b` are currently compared cells' original values (sources). Must return a number (see the standard JS's Array.prototype.sort)
  alignHead?: DataTableAlignOptions // horizontal alignment of the column's heading
  verticalAlignHead?: DataTableVerticalAlignOptions // vertical alignment of the column's heading
  align?: DataTableAlignOptions // horizontal <td>'s alignment
  verticalAlign?: DataTableVerticalAlignOptions // vertical <td>'s alignment
  width?: string | number
  classes?: DataTableClassesOptions
  headerClasses?: DataTableClassesOptions
  style?: DataTableStyleOptions
  headerStyle?: DataTableStyleOptions
}

export type DataTableColumnSource = DataTableColumn | string

// inner representation of the columns
export interface DataTableColumnInternal {
  source: DataTableColumnSource
  initialIndex: number
  key: string
  label: string
  headerTitle: string
  sortable: boolean
  sortingFn: ((a: any, b: any) => number) | undefined
  alignHead: DataTableAlignOptions
  verticalAlignHead: DataTableVerticalAlignOptions
  align: DataTableAlignOptions
  verticalAlign: DataTableVerticalAlignOptions
  width?: string | number
  classes?: string | string[] | (() => string | string[])
  headerClasses?: string | string[] | (() => string | string[])
  style?: Record<string, any> | (() => Record<string, any>)
  headerStyle?: Record<string, any> | (() => Record<string, any>)
}

export type DataTableItem = Record<string, any>

// the inner representation of table cells
export interface DataTableCell {
  /** @deprecated */
  source?: any;
  rowData: DataTableItem;
  column: DataTableColumn
  value: string
  rowIndex: number
}

// the inner representation of table rows
export interface DataTableRow {
  source: DataTableItem
  initialIndex: number
  cells: DataTableCell[]
}

export type DataTableFilterMethod = (source: any) => boolean

export type DataTableSortingOrder = StringWithAutocomplete<'asc' | 'desc'> | null

export type DataTableSelectMode = StringWithAutocomplete<'single' | 'multiple'>
