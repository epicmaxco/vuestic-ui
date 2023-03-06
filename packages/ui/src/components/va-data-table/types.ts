export type DataTableAlignOptions = 'left' | 'center' | 'right'
export type DataTableVerticalAlignOptions = 'top' | 'middle' | 'bottom'

export type DataTableColumnClass = unknown | (() => unknown)
export type DataTableColumnStyle = unknown | (() => unknown)

export type DataTableSortingOrder = 'asc' | 'desc' | null
export type DataTableSortingOptions = DataTableSortingOrder[]

// provided column definitions (<va-data-table `:columns="myColumns"` />)
// should look like an array of the following objects (and/or strings)
export type DataTableColumn<T = string> = {
  [key: string]: any
  key: T // name of an item's property: 'userName', 'address.zipCode'
  name?: string // column unique name (used in slots)
  label?: string // what to display in the respective heading
  thTitle?: string // <th>'s `title` attribute's value
  sortable?: boolean // whether the table can be sorted by that column
  sortingFn?: (a: any, b: any) => number // a custom sorting function. `a` and `b` are currently compared cells' original values (sources). Must return a number (see the standard JS's Array.prototype.sort)
  sortingOptions?: DataTableSortingOptions
  thAlign?: DataTableAlignOptions // horizontal alignment
  thVerticalAlign?: DataTableVerticalAlignOptions // vertical alignment
  tdAlign?: DataTableAlignOptions // horizontal alignment
  tdVerticalAlign?: DataTableVerticalAlignOptions // vertical alignment
  width?: string | number
  thClass?: DataTableColumnClass
  tdClass?: DataTableColumnClass
  thStyle?: DataTableColumnStyle
  tdStyle?: DataTableColumnStyle

  /** @deprecated use `thTitle` instead */
  headerTitle?: string

  /** @deprecated use `thAlign` instead */
  alignHead?: DataTableAlignOptions

  /** @deprecated use `thVerticalAlign` instead */
  verticalAlignHead?: DataTableVerticalAlignOptions

  /** @deprecated use `tdAlign` instead */
  align?: DataTableAlignOptions

  /** @deprecated use `tdVerticalAlign` instead */
  verticalAlign?: DataTableVerticalAlignOptions

  /** @deprecated use `tdClass` instead */
  classes?: DataTableColumnClass

  /** @deprecated use `thClass` instead */
  headerClasses?: DataTableColumnClass

  /** @deprecated use `tdStyle` instead */
  style?: DataTableColumnStyle

  /** @deprecated use `thStyle` instead */
  headerStyle?: DataTableColumnStyle
}

export type DataTableColumnSource = DataTableColumn | string

// inner representation of the columns
export interface DataTableColumnInternal {
  [key: string]: any
  source: DataTableColumnSource
  initialIndex: number
  key: string
  name: string
  label: string
  thTitle: string
  sortable: boolean
  sortingFn: ((a: any, b: any) => number) | undefined
  sortingOptions: DataTableSortingOptions
  thAlign: DataTableAlignOptions
  thVerticalAlign: DataTableVerticalAlignOptions
  tdAlign: DataTableAlignOptions
  tdVerticalAlign: DataTableVerticalAlignOptions
  width?: string | number
  tdClass?: DataTableColumnClass
  thClass?: DataTableColumnClass
  tdStyle?: DataTableColumnStyle
  thStyle?: DataTableColumnStyle
}

export type DataTableItem = Record<string, any>
export type DataTableItemKey = any

// the inner representation of table cells
export interface DataTableCell {
  rowIndex: number
  rowKey: DataTableItemKey
  rowData: DataTableItem
  column: DataTableColumnInternal
  source: any
  value: string
}

// the inner representation of table rows
export interface DataTableRow {
  initialIndex: number
  itemKey: DataTableItemKey
  source: DataTableItem
  cells: DataTableCell[],
  /** Same rowData as in DataTableCell */
  rowData: DataTableItem
}

export type DataTableFilterMethod = (source: any) => boolean

export type DataTableSelectMode = 'single' | 'multiple'

export type DataTableRowBind = Record<string, string> | ((item: DataTableItem, index: number) => Record<string, string>)

export type DataTableCellBind = Record<string, string> | ((cell: any, row: DataTableItem, column: DataTableColumnInternal, index: number) => Record<string, string>)
