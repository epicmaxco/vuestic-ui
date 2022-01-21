import { computed, Ref } from 'vue'
import { ITableItem } from './useRows'
import { merge, startCase } from 'lodash-es'

export type TAlignOptions = 'left' | 'center' | 'right';
export type TVerticalAlignOptions = 'top' | 'middle' | 'bottom';
export type TClassesOptions = string | string[] | (() => string | string[]);
export type TStyleOptions = Record<string, any> | (() => Record<string, any>);

// provided column definitions (<va-data-table `:columns="myColumns"` />)
// should look like an array of the following objects (and/or strings)
export interface ITableColumn {
  key: string; // name of an item's property
  label?: string; // what to display in the respective heading
  headerTitle?: string; // <th>'s `title` attribute's value
  sortable?: boolean, // whether the table can be sorted by that column
  sortingFn?: (a: any, b: any) => number; // a custom sorting function. `a` and `b` are currently compared cells' original values (sources). Must return a number (see the standard JS's Array.prototype.sort)
  alignHead?: TAlignOptions; // horizontal alignment of the column's heading
  verticalAlignHead?: TVerticalAlignOptions; // vertical alignment of the column's heading
  align?: TAlignOptions; // horizontal <td>'s alignment
  verticalAlign?: TVerticalAlignOptions; // vertical <td>'s alignment
  width?: string | number;
  classes?: TClassesOptions;
  headerClasses?: TClassesOptions;
  style?: TStyleOptions;
  headerStyle?: TStyleOptions;
}

export type TTableColumnSource = ITableColumn | string

// inner representation of the columns
export interface TableColumn {
  source: TTableColumnSource;
  initialIndex: number;
  key: string;
  label: string;
  headerTitle: string;
  sortable: boolean;
  sortingFn: ((a: any, b: any) => number) | undefined;
  alignHead: TAlignOptions;
  verticalAlignHead: TVerticalAlignOptions;
  align: TAlignOptions;
  verticalAlign: TVerticalAlignOptions;
  width?: string | number;
  classes?: string | string[] | (() => string | string[]);
  headerClasses?: string | string[] | (() => string | string[]);
  style?: Record<string, any> | (() => Record<string, any>);
  headerStyle?: Record<string, any> | (() => Record<string, any>);
}

export const buildTableColumn = (source: TTableColumnSource, initialIndex: number): TableColumn => {
  const input = typeof source === 'string' ? { key: source } : source

  return {
    source,
    initialIndex,
    key: input.key,
    label: input.label || startCase(input.key),
    headerTitle: input.headerTitle || input.label || startCase(input.key),
    sortable: input.sortable || false,
    sortingFn: input.sortingFn || undefined,
    alignHead: input.alignHead || 'left',
    verticalAlignHead: input.verticalAlignHead || 'middle',
    align: input.align || 'left',
    verticalAlign: input.verticalAlign || 'middle',
    width: input.width || '',
    classes: input.classes || '',
    headerClasses: input.headerClasses || '',
    style: input.style || {},
    headerStyle: input.headerStyle || {},
  }
}

const buildColumnsFromItems = (rawItems: Ref<ITableItem[]>) => {
  return Object.keys(merge({}, ...rawItems.value)).map(buildTableColumn)
}

const buildNormalizedColumns = (rawColumns: Ref<TTableColumnSource[]>) => {
  return rawColumns.value.map(buildTableColumn)
}

export default function useColumns (
  rawColumns: Ref<TTableColumnSource[]>,
  rawItems: Ref<ITableItem[]>,
) {
  const columns = computed(() => {
    if (rawColumns.value.length === 0) {
      // if no column definitions provided then build them based on provided rawItems
      // e.g. if provided items look like `[{a: 1}, {b: 2}]` then there should be 2 columns: A and B
      return buildColumnsFromItems(rawItems)
    } else {
      return buildNormalizedColumns(rawColumns)
    }
  })

  return {
    columns,
  }
}
