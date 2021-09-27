import { Ref, computed } from 'vue'
import { TableColumn } from './useColumns'

// each provided item is an object with variable number of fields. Each object's key must be a string and the value can
// be anything
export type ITableItem = Record<string, any>

// the inner representation of table rows
export class TableRow {
  // accepts a raw item (in the form a user provided it through the `items` prop) and all the table's columns
  constructor (rawItem: ITableItem, initialIndex: number, columns: TableColumn[]) {
    // save the initial item's definition
    this.source = rawItem

    // save the position of the item as initially provided to the prop (for the sakes of being able to un-sort
    // everything to the initial order)
    this.initialIndex = initialIndex

    // store the cells in the `cells` property in the form of TableCell objects
    this.cells = columns.map(column => {
      return new TableCell(this, column, rawItem[column.key])
    })
  }

  readonly source: ITableItem;
  readonly initialIndex: number;
  // eslint-disable-next-line no-use-before-define
  readonly cells: TableCell[];
}

// the inner cell representation. Holds references to a row and a column it belongs to
export class TableCell {
  // takes a row and a column, saves them and holds the stringified cell's value inside the `value` field and the actual
  // (initial) value inside the `source` field
  constructor (row: TableRow, column: TableColumn, value: any) {
    this.source = value
    this.row = row
    this.column = column
    this.value = value?.toString?.() || ''
  }

  readonly source: any;
  readonly row: TableRow;
  readonly column: TableColumn;
  readonly value: string;
}

// please, note that the `columns` here are not raw, but rather already built `TableColumn` instances
export default function useRows (
  rawItems: Ref<ITableItem[]>,
  columns: Ref<TableColumn[]>,
) {
  // build table rows (and thus the cell internally, see the TableRow's constructor) from the items provided via the
  // `items` prop
  const rows = computed(() => {
    return rawItems.value.map((rawItem, index) => {
      return new TableRow(rawItem, index, columns.value)
    })
  })

  return {
    rows,
  }
}
