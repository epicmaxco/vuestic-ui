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

  let prevSelectedIndex = 0;

  function toggleRowSelection(row: TableRow, shift: boolean = false) {
    if (selectMode.value === "single") {
      if (selectedItems.value[0] === row.source) {
        selectedItems.value.splice(0, 1);
      } else {
        selectedItems.value.splice(0, 1, row.source);
      }
    } else if (selectMode.value === "multiple") {
      if (shift) {
        const targetIndex = rows.value.indexOf(row);
        const start = Math.min(prevSelectedIndex, targetIndex);
        const end = Math.max(prevSelectedIndex, targetIndex < prevSelectedIndex ? targetIndex : (targetIndex + 1));

        const rowsToSelect = rows.value.slice(start, end).filter(selectedRow => {
          return !selectedItems.value.includes(selectedRow.source);
        });

        selectedItems.value = selectedItems.value.concat(rowsToSelect.map(row => row.source));
      } else {
        const index = selectedItems.value.indexOf(row.source);

        if (index !== -1) {
          selectedItems.value.splice(index, 1);
        } else {
          selectedItems.value.push(row.source);
        }

        prevSelectedIndex = rows.value.indexOf(row);
      }
    }
  }

  function isRowSelected(row: TableRow) {
    return selectedItems.value.includes(row.source);
  }

  return {
    selectedItems,
    toggleBulkSelection,
    toggleRowSelection,
    isRowSelected,
  }
}
