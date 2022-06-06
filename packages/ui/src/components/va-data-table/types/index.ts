import { StringWithAutocomplete } from '../../../types/string-with-autocomplete'

export type DataTableColumnAlign = StringWithAutocomplete<'left' | 'center' | 'right'>
export type DataTableColumnVerticalAlign = StringWithAutocomplete<'top' | 'middle' | 'bottom'>
export type DataTableColumnClass = unknown | (() => unknown)
export type DataTableColumnStyle = unknown | (() => unknown)

// provided column definitions (<va-data-table `:columns="myColumns"` />)
// should look like an array of the following objects (and/or strings)
export interface DataTableColumn {
  key: string // name of an item's property
  label?: string // what to display in the respective heading
  headerTitle?: string // <th>'s `title` attribute's value
  sortable?: boolean // whether the table can be sorted by that column
  sortingFn?: (a: any, b: any) => number // a custom sorting function. `a` and `b` are currently compared cells' original values (sources). Must return a number (see the standard JS's Array.prototype.sort)
  alignHead?: DataTableColumnAlign // horizontal alignment of the column's heading
  verticalAlignHead?: DataTableColumnVerticalAlign // vertical alignment of the column's heading
  align?: DataTableColumnAlign // horizontal <td>'s alignment
  verticalAlign?: DataTableColumnVerticalAlign // vertical <td>'s alignment
  width?: string | number
  class?: DataTableColumnClass
  headerClass?: DataTableColumnClass
  style?: DataTableColumnStyle
  headerStyle?: DataTableColumnStyle

  /** @deprecated use `class` instead */
  classes?: DataTableColumnClass

  /** @deprecated use `headerClass` instead */
  headerClasses?: DataTableColumnClass
}

export type DataTableColumnSource = DataTableColumn | string

// inner representation of the columns
export interface TableColumn {
  source: DataTableColumnSource
  initialIndex: number
  key: string
  label: string
  headerTitle: string
  sortable: boolean
  sortingFn: ((a: any, b: any) => number) | undefined
  alignHead: DataTableColumnAlign
  verticalAlignHead: DataTableColumnVerticalAlign
  align: DataTableColumnAlign
  verticalAlign: DataTableColumnVerticalAlign
  width?: string | number
  class?: DataTableColumnClass
  headerClass?: DataTableColumnClass
  style?: DataTableColumnStyle
  headerStyle?: DataTableColumnStyle
}

export type DataTableItem = Record<string, any>

// the inner representation of table cells
export interface DataTableCell {
  rowData: DataTableItem;
  column: TableColumn
  value: string
  rowIndex: number

  /** @deprecated */
  source?: any;
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

export type DataTableRowClass = unknown | ((item: DataTableItem, index: number) => unknown)

export type DataTableRowStyle = unknown | ((item: DataTableItem, index: number) => unknown)
