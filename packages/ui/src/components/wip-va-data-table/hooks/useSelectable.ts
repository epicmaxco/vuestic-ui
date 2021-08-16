import {computed, ref, Ref, watch} from "vue";
import {ITableItem, TableRow} from "./useRows";

export type TSelectMode = "single" | "multiple";

export default function useSelectable(selectMode: Ref<TSelectMode>, modelValue: Ref<ITableItem[]>, rows: Ref<TableRow[]>, emit: any) {
  const selectedItems = ref<ITableItem[]>(modelValue.value);

  watch([selectedItems, selectedItems.value], () => {
    emit("update:modelValue", selectedItems.value);
  })

  function toggleBulkSelection() {
    if (selectedItems.value.length === rows.value.length) {
      selectedItems.value = [];
    } else {
      selectedItems.value = rows.value.map(row => row.source);
    }
  }

  function toggleRowSelection(row: TableRow) {
    if (selectMode.value === "multiple") {
      const index = selectedItems.value.indexOf(row.source);

      if (index !== -1) {
        selectedItems.value.splice(index, 1);
      } else {
        selectedItems.value.push(row.source);
      }
    } else if (selectMode.value === "single") {
      if (selectedItems.value[0] === row.source) {
        selectedItems.value.splice(0, 1);
      } else {
        selectedItems.value.splice(0, 1, row.source);
      }
    }
  }

  return {
    selectedItems,
    toggleBulkSelection,
    toggleRowSelection,
  }
}
