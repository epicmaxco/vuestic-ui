const headerScope = `
{
  key: string,
  label: string,
}`

const cellScope = `
{
  cell: DataTableCellScope,
  row: DataTableRowScope,
}

// types description

type DataTableCellScope {
  rowIndex: number, // the same as "initialIndex" in "DataTableRowScope" type
  rowKey: any,
  rowData: DataTableItem,
  column: DataTableColumnScope,
  source: any,
  value: string,
}

type DataTableRowScope {
  initialIndex: number,
  itemKey: any,
  cells: DataTableCellScope[],
  /** Same rowData as in DataTableCellScope */
  rowData: DataTableItem,
}

type DataTableColumnScope {
  source: DataTableColumn | string,
  initialIndex: number,
  key: string,
  name: string,
  label: string,
}

type DataTableItem = Record<string, any>
`

const cellKeyScope = `
{
  rowIndex: number,
  rowKey: any,
  rowData: DataTableItem, // the same as in the "cell" slot
  column: DataTableColumnScope, // the same as in the "cell" slot
  source: any,
  value: string,
  row: DataTableRowScope, // the same as in the "cell" slot
  isExpanded: boolean,
}`

const expandableRowScope = `
{
  initialIndex: number,
  itemKey: any,
  cells: DataTableRowScope[], // the same as in the "cell" slot
  /** Same rowData as in DataTableRowScope */
  rowData: DataTableItem, // the same as in the "cell" slot
  toggleRowDetails: (show?: boolean) => void,
  isExpandableRowVisible: boolean,
}`

const filteredEvent = `
{
  items: DataTableItem[],
  itemsIndexes: number[],
}`

const rowClickEvent = `
// type RowClickEvent
{
  event: Event, // native mouse event
  item: DataTableItem,
  itemIndex: number,
}`

const selectionChangeEvent = `
{
  currentSelectedItems: (DataTableItem | DataTableItemKey)[],
  previousSelectedItems: (DataTableItem | DataTableItemKey)[],
}`

const sortedEvent = `
{
  sortBy: string,
  sortingOrder: DataTableSortingOrder,
  items: DataTableItem[],
  itemsIndexes: number[],
}`

export default defineManualApi({
  props: {
    columns: {
      types: "`(string | DataTableColumn)[]`",
    },
    filterMethod: {
      types: "`DataTableFilterMethod: (source: any) => boolean`",
    },
    items: {
      types: "`DataTableItem[]`",
    },
    selectMode: {
      types: "`DataTableSelectMode: 'single'|'multiple'`",
    },
    sortingOrder: {
      types: "`DataTableSortingOrder: 'asc'|'desc'|null`",
    },
    sortingOptions: {
      types: "`DataTableSortingOrder[]`",
    },
  },
  events: {
    filtered: {
      types: filteredEvent,
    },
    selectionChange: {
      types: selectionChangeEvent,
    },
    sorted: {
      types: sortedEvent,
    },
    "update:sortBy": {
      types: 'type String',
    },
    "update:sortingOrder": {
      types: 'type DataTableSortingOrder',
    },
    "row:click": {
      types: rowClickEvent,
    },
    "row:contextmenu": {
      types: 'type RowClickEvent',
    },
    "row:dblclick": {
      types: 'type RowClickEvent',
    },
    "scroll:bottom": {},
    "scroll:top": {},
  },
  slots: {
    colgroup: {
      types: 'type DataTableColumnScope[]',
    },
    headerPrepend: {},
    header: {
      types: headerScope,
    },
    "header(key)": {
      types: headerScope,
    },
    headerAppend: {},
    bodyPrepend: {},
    cell: {
      types: cellScope,
    },
    "cell(key)": {
      types: cellKeyScope,
    },
    bodyAppend: {},
    footerPrepend: {},
    footer: {
      types: headerScope,
    },
    "footer(key)": {
      types: headerScope,
    },
    footerAppend: {},
    expandableRow: {
      types: expandableRowScope,
    },
  },
});
