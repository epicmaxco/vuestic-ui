import {Ref, ref, computed} from "vue";
import {ITableItem} from "./useRows";
import {merge, startCase} from "lodash-es";

export interface ITableColumn {
  key: string;
  label?: string;
}

export class TableColumn implements ITableColumn {
  constructor(input: string | ITableColumn) {
    if (typeof input === "string") {
      this.key = input;
      this.label = startCase(input);
    } else {
      this.key = input.key;
      this.label = input.label || startCase(input.label)
    }
  }

  key;
  label;
}

export default function useColumns(columns: Ref<string[] | ITableColumn[] | undefined>, items: Ref<ITableItem[]>) {
  let normalizedColumns = ref<TableColumn[]>([]);

  if (columns.value) {
    normalizedColumns.value = columns.value.map((column: string | ITableColumn) => {
      return new TableColumn(column);
    })
  } else {
    normalizedColumns.value = Object.keys(merge({}, ...items.value)).map(columnName => new TableColumn(columnName))
  }

  const normalizedHeaders = computed(() => {
    return normalizedColumns.value.map(normalizedColumn => {
      return normalizedColumn.label;
    })
  });

  return {
    normalizedColumns,
    normalizedHeaders
  }
}
