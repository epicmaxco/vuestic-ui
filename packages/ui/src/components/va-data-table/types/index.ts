export type TAlignOptions = 'left' | 'center' | 'right'
export type TVerticalAlignOptions = 'top' | 'middle' | 'bottom'

export type TClassesOptions = string | string[] | (() => string | string[])
export type TStyleOptions = Record<string, any> | (() => Record<string, any>)

// provided column definitions (<va-data-table `:columns="myColumns"` />)
// should look like an array of the following objects (and/or strings)
export interface ITableColumn {
  key: string // name of an item's property
  label?: string // what to display in the respective heading
  headerTitle?: string // <th>'s `title` attribute's value
  sortable?: boolean // whether the table can be sorted by that column
  sortingFn?: (a: any, b: any) => number // a custom sorting function. `a` and `b` are currently compared cells' original values (sources). Must return a number (see the standard JS's Array.prototype.sort)
  alignHead?: TAlignOptions // horizontal alignment of the column's heading
  verticalAlignHead?: TVerticalAlignOptions // vertical alignment of the column's heading
  align?: TAlignOptions // horizontal <td>'s alignment
  verticalAlign?: TVerticalAlignOptions // vertical <td>'s alignment
  width?: string | number
  classes?: TClassesOptions
  headerClasses?: TClassesOptions
  style?: TStyleOptions
  headerStyle?: TStyleOptions
}

export type TTableColumnSource = ITableColumn | string

// inner representation of the columns
export interface TableColumn {
  source: TTableColumnSource
  initialIndex: number
  key: string
  label: string
  headerTitle: string
  sortable: boolean
  sortingFn: ((a: any, b: any) => number) | undefined
  alignHead: TAlignOptions
  verticalAlignHead: TVerticalAlignOptions
  align: TAlignOptions
  verticalAlign: TVerticalAlignOptions
  width?: string | number
  classes?: string | string[] | (() => string | string[])
  headerClasses?: string | string[] | (() => string | string[])
  style?: Record<string, any> | (() => Record<string, any>)
  headerStyle?: Record<string, any> | (() => Record<string, any>)
}

export type ITableItem = Record<string, any>

// the inner representation of table cells
export interface TableCell {
  /** @deprecated */
  source?: any;
  rowData: ITableItem;
  column: TableColumn
  value: string
  rowIndex: number
}

// the inner representation of table rows
export interface TableRow {
  source: ITableItem
  initialIndex: number
  cells: TableCell[]
}

export type TFilterMethod = (source: any) => boolean

export type TSortingOrder = 'asc' | 'desc' | null

export type TSelectMode = 'single' | 'multiple'
