import {computed, Ref, ref} from "vue";
import {ITableItem} from "./useRows";
import {merge, startCase} from "lodash-es";

export type TAlignOptions = "left" | "center" | "right";
export type TVerticalAlignOptions = "top" | "middle" | "bottom";

export interface ITableColumn {
  key: string;
  label?: string;
  headerTitle?: string;
  alignHead: TAlignOptions;
  verticalAlignHead: TVerticalAlignOptions;
  align: TAlignOptions;
  verticalAlign: TVerticalAlignOptions;
}

export class TableColumn implements ITableColumn {
  constructor(input: string | ITableColumn) {
    this.source = input;

    if (typeof input === "string") {
      this.key = input;
      this.label = startCase(input);
    } else {
      this.key = input.key;
      this.label = input.label || startCase(input.key);
      this.headerTitle = input.headerTitle;
      this.alignHead = input.alignHead;
      this.verticalAlignHead = input.verticalAlignHead;
      this.align = input.align;
      this.verticalAlign = input.verticalAlign;
    }
  }

  source;
  key;
  label;
  headerTitle;
  alignHead = "left" as TAlignOptions;
  verticalAlignHead = "top" as TVerticalAlignOptions;
  align = "left" as TAlignOptions;
  verticalAlign = "top" as TVerticalAlignOptions;
}

export default function useColumns(rawColumns: Ref<string[] | ITableColumn[] | undefined>, rawItems: Ref<ITableItem[]>) {
  const columns = computed(() => {
    if (rawColumns.value !== undefined) {
      // if column definitions are provided then unify them all to be instances of TableColumn
      return rawColumns.value.map((column: string | ITableColumn) => {
        return new TableColumn(column);
      });
    } else {
      // if no column definitions provided then build them based on provided rawItems
      return Object.keys(merge({}, ...rawItems.value)).map(columnName => new TableColumn(columnName));
    }
  });

  return {
    columns
  }
}
