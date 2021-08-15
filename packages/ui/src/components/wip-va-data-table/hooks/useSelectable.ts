import {computed, ref, Ref, watch} from "vue";
import {ITableItem, TableRow} from "./useRows";

export default function useSelectable(rows: Ref<TableRow[]>, emit: any) {
  const selectedItems = ref<ITableItem[]>([]);

  watch([selectedItems, selectedItems.value], () => {
    emit("update:modelValue", selectedItems.value);
  })

  function toggleBulkSelection(event: any) {
    if (selectedItems.value.length === rows.value.length) {
      selectedItems.value = [];
    } else {
      selectedItems.value = rows.value.map(row => row.source);
    }
  }

  function toggleRowSelection(row: TableRow) {
    const index = selectedItems.value.indexOf(row.source);

    if (index !== -1) {
      selectedItems.value.splice(index, 1);
    } else {
      selectedItems.value.push(row.source);
    }
  }

  return {
    selectedItems,
    toggleBulkSelection,
    toggleRowSelection,
  }
}
