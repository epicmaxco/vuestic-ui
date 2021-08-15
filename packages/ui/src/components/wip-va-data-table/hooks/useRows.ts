import {Ref, computed} from "vue";
import {TableColumn} from "./useColumns";

export type ITableItem = Record<string, any>

export class TableCell {
  constructor(rawItem: ITableItem, column: TableColumn) {
    this.item = rawItem;
    this.column = column;
    this.value = rawItem[column.key]?.toString?.() || "";
  }

  item: ITableItem;
  column: TableColumn;
  value: any;
}

export default function useRows(rawItems: Ref<ITableItem[]>, columns: Ref<TableColumn[]>) {
  // build two-dimensional array for cells
  const rows = computed(() => {
    return rawItems.value.map(rawItem => {
      return columns.value.map(column => {
        return new TableCell(rawItem, column);
      })
    })
  });

  return {
    rows
  }
};
