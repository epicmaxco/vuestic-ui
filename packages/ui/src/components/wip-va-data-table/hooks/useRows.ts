import {Ref, computed} from "vue";
import {TableColumn} from "./useColumns";

// each provided item is an object with variable number of fields. Each object's key must be a string and the value can be anything
export type ITableItem = Record<string, any>

// the inner representation of table rows
export class TableRow {
  // accepts a raw item (in the form a user provided it through the `items` prop) and all the table's columns
  constructor(rawItem: ITableItem, initialIndex: number, columns: TableColumn[]) {
    // save the initial item's definition
    this.source = rawItem;

    this.initialIndex = initialIndex;

    // store the cells in the `cells` property in the form of TableCell objects
    this.cells = columns.map(column => {
      return new TableCell(this, column, rawItem[column.key]);
    })
  }

  source: ITableItem;
  initialIndex: number;
  cells: TableCell[];
}

// the inner cell representation. Holds references to a row and a column in belongs to
export class TableCell {
  // takes a row and a column, saves them and holds the stringified cell's value inside the `value` field and the actual (initial) value inside the `source`
  constructor(row: TableRow, column: TableColumn, value: any) {
    this.source = value;
    this.row = row;
    this.column = column;
    this.value = value?.toString?.() || "";
  }

  source: any;
  row: TableRow;
  column: TableColumn;
  value: string;
}

// please, note that the `columns` here are now raw, but rather already built `TableColumn` instances
export default function useRows(rawItems: Ref<ITableItem[]>, columns: Ref<TableColumn[]>) {
  // build table rows (and thus the cell internally, see the TableRow's constructor) from the items provided via the `items` prop
  const rows = computed(() => {
    return rawItems.value.map((rawItem, index) => {
      return new TableRow(rawItem, index, columns.value);
    });
  });

  return {
    rows
  }
};
