import {computed, Ref, ref} from "vue";
import {ITableItem} from "./useRows";
import {merge, startCase} from "lodash-es";

// available alignment options
export type TAlignOptions = "left" | "center" | "right";
export type TVerticalAlignOptions = "top" | "middle" | "bottom";

// provided column definitions (<va-data-table `:columns="myColumns"` />) should look like an array of the following objects (or strings)
export interface ITableColumn {
  key: string; // name of an item's property
  label?: string; // what to display in the respective heading
  headerTitle?: string; // <th>'s `title` attribute's value
  sortable?: boolean, // whether the table can be sorted by that column
  sortingFn?: (a: string, b: string) => number; // a custom sorting function. `a` and `b` are currently compared cells' values. Must return a number (see the standard JS Array.prototype.sort)
  alignHead?: TAlignOptions; // horizontal alignment of the column's heading
  verticalAlignHead?: TVerticalAlignOptions; // vertical alignment of the column's heading
  align?: TAlignOptions; // horizontal <td>'s alignment
  verticalAlign?: TVerticalAlignOptions; // vertical
}

// inner representation of the columns
export class TableColumn implements ITableColumn {
  // takes either a string or a ITableColumn as an input and returns a new Object (which implements the ITableColumn interface).
  // Guarantees that the `key` and the `label` will present. All the other fields are optional (a user might provide them
  // or they might not). `source` holds the initial column's definition (in the form the user provided it).
  constructor(input: string | ITableColumn) {
    this.source = input;

    if (typeof input === "string") {
      this.key = input;
      this.label = startCase(input);
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

  source: string | ITableColumn;
  key;
  label;
  headerTitle?;
  sortable?;
  sortingFn?;
  alignHead?;
  verticalAlignHead?;
  align?;
  verticalAlign?;
}

// `rawColumns` and `rawItems` are the columns and the items respectively in the form the user provided them (i.e. raw props)
export default function useColumns(rawColumns: Ref<string[] | ITableColumn[] | undefined>, rawItems: Ref<ITableItem[]>) {
  const columns = computed(() => {
    // `columns` is an optional prop, so it may not be provided (=== undefined)
    if (rawColumns.value !== undefined) {
      // if it's provided, then build the columns' inner representations from that `columns` prop's value
      return rawColumns.value.map((column: string | ITableColumn) => {
        return new TableColumn(column);
      });
    } else {
      // if no column definitions provided then build them based on provided rawItems
      // e.g. if provided items look like `[{a: 1}, {b: 2}]` then there should be 2 columns: A and B
      return Object.keys(merge({}, ...rawItems.value)).map(columnName => new TableColumn(columnName));
    }
  });

  return {
    columns
  }
}
