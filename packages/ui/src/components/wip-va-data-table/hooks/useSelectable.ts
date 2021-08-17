import {computed, ref, Ref, watch} from "vue";
import {ITableItem, TableRow} from "./useRows";

// the available options for the `select-mode` prop
export type TSelectMode = "single" | "multiple";

// TODO: the `emit` shouldn't be any!
export default function useSelectable(selectMode: Ref<TSelectMode>, modelValue: Ref<ITableItem[]>, rows: Ref<TableRow[]>, emit: any) {
  // the reactive array holding the currently selected items. Note that the array doesn't hold the TableRaw instances. Instead, it holds the raw items
  const selectedItems = ref<ITableItem[]>(modelValue.value);

  // each time it changes the `v-model` should be updated respectively, so watch for changes.
  // BTW, I'm not sure why it's necessary here to listen for the `.value` changes, though it doesn't work without that. TODO: figure out
  watch([selectedItems, selectedItems.value], () => {
    emit("update:modelValue", selectedItems.value);
  })

  // select or unselect all the rows
  function toggleBulkSelection() {
    if (selectedItems.value.length === rows.value.length) {
      selectedItems.value = [];
    } else {
      selectedItems.value = rows.value.map(row => row.source);
    }
  }

  // quite buggy. Should be reconsidered (maybe even the generic (is it?) useSelectable composable should be used instead. TODO
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

  // check if a given row is selected
  function isRowSelected(row: TableRow) {
    // it is if the row's initial item is inside the `selectedItems` array
    return selectedItems.value.includes(row.source);
  }

  return {
    selectedItems,
    toggleBulkSelection,
    toggleRowSelection,
    isRowSelected,
  }
}
