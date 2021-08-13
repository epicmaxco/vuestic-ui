import {Ref, computed} from "vue";
import {TableColumn} from "./useColumns";

export type ITableItem = Record<string, unknown>

export default function useRows(normalizedColumns: Ref<TableColumn[]>, items: Ref<ITableItem[]>) {
  const normalizedRows = computed(() => {
    return items.value.map(item => {
      return normalizedColumns.value.map(normalizedColumn => {
        return item[normalizedColumn.key] || "";
      })
    })
  });

  return {
    normalizedRows
  }
};
