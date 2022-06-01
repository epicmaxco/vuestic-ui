import { StringWithAutocomplete } from '../../../types/string-with-autocomplete'

export type VaDataTableColumnAlign = StringWithAutocomplete<'left' | 'center' | 'right'>
export type VaDataTableColumnVerticalAlign = StringWithAutocomplete<'top' | 'middle' | 'bottom'>
export type VaDataTableColumnClasses = string | string[] | (() => string | string[])
export type VaDataTableColumnStyle = Record<string, any> | (() => Record<string, any>)

// provided column definitions (<va-data-table `:columns="myColumns"` />)
// should look like an array of the following objects (and/or strings)
export interface VaDataTableColumn {
  key: string // name of an item's property
  label?: string // what to display in the respective heading
  headerTitle?: string // <th>'s `title` attribute's value
  sortable?: boolean // whether the table can be sorted by that column
  sortingFn?: (a: any, b: any) => number // a custom sorting function. `a` and `b` are currently compared cells' original values (sources). Must return a number (see the standard JS's Array.prototype.sort)
  alignHead?: VaDataTableColumnAlign // horizontal alignment of the column's heading
  verticalAlignHead?: VaDataTableColumnVerticalAlign // vertical alignment of the column's heading
  align?: VaDataTableColumnAlign // horizontal <td>'s alignment
  verticalAlign?: VaDataTableColumnVerticalAlign // vertical <td>'s alignment
  width?: string | number
  classes?: VaDataTableColumnClasses
  headerClasses?: VaDataTableColumnClasses
  style?: VaDataTableColumnStyle
  headerStyle?: VaDataTableColumnStyle
}

export type TTableColumnSource = VaDataTableColumn | string

// inner representation of the columns
export interface TableColumn {
  source: TTableColumnSource
  initialIndex: number
  key: string
  label: string
  headerTitle: string
  sortable: boolean
  sortingFn: ((a: any, b: any) => number) | undefined
  alignHead: VaDataTableColumnAlign
  verticalAlignHead: VaDataTableColumnVerticalAlign
  align: VaDataTableColumnAlign
  verticalAlign: VaDataTableColumnVerticalAlign
  width?: string | number
  classes?: VaDataTableColumnClasses
  headerClasses?: VaDataTableColumnClasses
  style?: VaDataTableColumnStyle
  headerStyle?: VaDataTableColumnStyle
}

export type VaDataTableItem = Record<string, any>

// the inner representation of table cells
export interface TableCell {
  /** @deprecated */
  source?: any;
  rowData: VaDataTableItem;
  column: TableColumn
  value: string
  rowIndex: number
}

// the inner representation of table rows
export interface TableRow {
  source: VaDataTableItem
  initialIndex: number
  cells: TableCell[]
}

export type VaDataTableFilterMethod = (source: any) => boolean

export type VaDataTableSortingOrder = StringWithAutocomplete<'asc' | 'desc'> | null

export type VaDataTableSelectMode = StringWithAutocomplete<'single' | 'multiple'>

export type VaDataTableRowClass = unknown | ((item: VaDataTableItem, index: number) => unknown)

export type VaDataTableRowStyle = unknown | ((item: VaDataTableItem, index: number) => unknown)
