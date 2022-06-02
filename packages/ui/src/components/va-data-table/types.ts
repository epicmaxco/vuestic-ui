import { StringWithAutocomplete } from '../../types/string-with-autocomplete'

export type DateTableAlignOptions = StringWithAutocomplete<'left' | 'center' | 'right'>
export type DateTableVerticalAlignOptions = StringWithAutocomplete<'top' | 'middle' | 'bottom'>

export type DateTableClassesOptions = string | string[] | (() => string | string[])
export type DateTableStyleOptions = Record<string, any> | (() => Record<string, any>)

// provided column definitions (<va-data-table `:columns="myColumns"` />)
// should look like an array of the following objects (and/or strings)
export interface DateTableColumn {
  key: string // name of an item's property
  label?: string // what to display in the respective heading
  headerTitle?: string // <th>'s `title` attribute's value
  sortable?: boolean // whether the table can be sorted by that column
  sortingFn?: (a: any, b: any) => number // a custom sorting function. `a` and `b` are currently compared cells' original values (sources). Must return a number (see the standard JS's Array.prototype.sort)
  alignHead?: DateTableAlignOptions // horizontal alignment of the column's heading
  verticalAlignHead?: DateTableVerticalAlignOptions // vertical alignment of the column's heading
  align?: DateTableAlignOptions // horizontal <td>'s alignment
  verticalAlign?: DateTableVerticalAlignOptions // vertical <td>'s alignment
  width?: string | number
  classes?: DateTableClassesOptions
  headerClasses?: DateTableClassesOptions
  style?: DateTableStyleOptions
  headerStyle?: DateTableStyleOptions
}

export type DateTableColumnSource = DateTableColumn | string

// inner representation of the columns
export interface TableColumn {
  source: DateTableColumnSource
  initialIndex: number
  key: string
  label: string
  headerTitle: string
  sortable: boolean
  sortingFn: ((a: any, b: any) => number) | undefined
  alignHead: DateTableAlignOptions
  verticalAlignHead: DateTableVerticalAlignOptions
  align: DateTableAlignOptions
  verticalAlign: DateTableVerticalAlignOptions
  width?: string | number
  classes?: string | string[] | (() => string | string[])
  headerClasses?: string | string[] | (() => string | string[])
  style?: Record<string, any> | (() => Record<string, any>)
  headerStyle?: Record<string, any> | (() => Record<string, any>)
}

export type DateTableItem = Record<string, any>

// the inner representation of table cells
export interface DateTableCell {
  /** @deprecated */
  source?: any;
  rowData: DateTableItem;
  column: TableColumn
  value: string
  rowIndex: number
}

// the inner representation of table rows
export interface DateTableRow {
  source: DateTableItem
  initialIndex: number
  cells: DateTableCell[]
}

export type DateTableFilterMethod = (source: any) => boolean

export type DateTableSortingOrder = StringWithAutocomplete<'asc' | 'desc'> | null

export type DateTableSelectMode = StringWithAutocomplete<'single' | 'multiple'>
