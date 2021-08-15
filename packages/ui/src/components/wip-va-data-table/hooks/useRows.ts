import {Ref, computed} from "vue";
import {TableColumn} from "./useColumns";

export type ITableItem = Record<string, any>

export class TableRow {
  constructor(rawItem: ITableItem, columns: TableColumn[]) {
    this.source = rawItem;

    this.cells = columns.map(column => {
      return new TableCell(this, column, rawItem[column.key]);
    })
  }

  source: ITableItem;
  cells: TableCell[];
}

export class TableCell {
  constructor(row: TableRow, column: TableColumn, value: any) {
    this.row = row;
    this.column = column;
    this.value = value?.toString?.() || "";
  }

  row: TableRow;
  column: TableColumn;
  value: string;
}

export default function useRows(rawItems: Ref<ITableItem[]>, columns: Ref<TableColumn[]>) {
  const rows = computed(() => {
    return rawItems.value.map(rawItem => {
      return new TableRow(rawItem, columns.value);
    });
  });

  return {
    rows
  }
};
