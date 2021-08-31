import { computed, Ref } from "vue";
import { ITableItem } from "./useRows";
import { merge, startCase } from "lodash-es";

// available alignment options
export type TAlignOptions = "left" | "center" | "right";
export type TVerticalAlignOptions = "top" | "middle" | "bottom";

// provided column definitions (<va-data-table `:columns="myColumns"` />) should look like an array of the following
// objects (and/or strings)
export interface ITableColumn {
  key: string; // name of an item's property
  label?: string; // what to display in the respective heading
  headerTitle?: string; // <th>'s `title` attribute's value
  sortable?: boolean, // whether the table can be sorted by that column
  sortingFn?: (a: any, b: any) => number; // a custom sorting function. `a` and `b` are currently compared cells'
  // original values (sources). Must return a number (see the standard JS's Array.prototype.sort)
  alignHead?: TAlignOptions; // horizontal alignment of the column's heading
  verticalAlignHead?: TVerticalAlignOptions; // vertical alignment of the column's heading
  align?: TAlignOptions; // horizontal <td>'s alignment
  verticalAlign?: TVerticalAlignOptions; // vertical <td>'s alignment
}

// inner representation of the columns
export class TableColumn {
  // takes either a string or a ITableColumn as an input and returns a new Object that describes the column. Guarantees
  // that the all the fields has a value to them. The `source` field holds the initial column's definition (in the form
  // the user provided it).
  constructor(input: string | ITableColumn, initialIndex: number) {
    this.source = input;

    // save the initial column's index. May come useful later
    this.initialIndex = initialIndex;

    if (typeof input === "string") {
      this.key = input;
      this.label = startCase(input);
      this.headerTitle = this.label;
      this.sortable = false;
      this.sortingFn = undefined;
      this.alignHead = "left";
      this.verticalAlignHead = "top";
      this.align = "left";
      this.verticalAlign = "top";
    } else {
      this.key = input.key;
      this.label = input.label || startCase(input.key);
      this.headerTitle = input.headerTitle || this.label;
      this.sortable = input.sortable || false;
      this.sortingFn = input.sortingFn || undefined;
      this.alignHead = input.alignHead || "left";
      this.verticalAlignHead = input.verticalAlignHead || "top";
      this.align = input.align || "left";
      this.verticalAlign = input.verticalAlign || "top";
    }
  }

  readonly source: string | ITableColumn;
  readonly initialIndex: number;
  readonly key;
  readonly label;
  readonly headerTitle;
  readonly sortable;
  readonly sortingFn;
  readonly alignHead: TAlignOptions;
  readonly verticalAlignHead: TVerticalAlignOptions;
  readonly align: TAlignOptions;
  readonly verticalAlign: TVerticalAlignOptions;
}

// `rawColumns` and `rawItems` are the columns and the items respectively in the form the user provided them (i.e. raw
// props)
export default function useColumns(rawColumns: Ref<(string | ITableColumn)[]>, rawItems: Ref<ITableItem[]>) {
  const columns = computed(() => {
    // if the `columns` prop is not provided, it defaults to an empty array
    if (rawColumns.value.length >= 1) {
      // if it's provided, then build the columns' inner representations from that `columns` prop's value
      return rawColumns.value.map((column, index) => {
        return new TableColumn(column, index);
      });
    } else {
      // if no column definitions provided then build them based on provided rawItems
      // e.g. if provided items look like `[{a: 1}, {b: 2}]` then there should be 2 columns: A and B
      return Object.keys(merge({}, ...rawItems.value)).map((columnName, index) => new TableColumn(columnName, index));
    }
  });

  return {
    columns
  }
}
