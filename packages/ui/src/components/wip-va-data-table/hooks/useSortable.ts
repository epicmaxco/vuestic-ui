import {TableColumn} from "./useColumns";
import {ref, Ref} from "vue";
import {TableRow} from "./useRows";

export type TSortingOrder = "asc" | "desc";

// TODO: reconsider to support v-model:sort or something similar instead
export default function useSortable(columns: Ref<TableColumn[]>, rows: Ref<TableRow[]>, initiallySortedBy: Ref<string>, initialSortingOrder: Ref<TSortingOrder>) {
  // take the copy of the rows in their initial order (so that we can later un-sort everything)
  const initiallyOrderedRows = rows.value.slice();
  const columnToSortByInitially = columns.value.find(column => column.key === initiallySortedBy.value) || null

  const sortedBy = ref<TableColumn | null>(null);
  const sortingOrder = ref<TSortingOrder>(!!columnToSortByInitially ? initialSortingOrder.value : "asc");

  if (columnToSortByInitially) {
    sortByColumn(columnToSortByInitially)
  }

  function sortByColumn(column: TableColumn) {
    const columnIndex = columns.value.indexOf(column);

    function restore() {
      rows.value.splice(0, rows.value.length, ...initiallyOrderedRows);
    }

    function sort() {
      rows.value = rows.value.sort((a, b) => {
        const firstVal = a.cells[columnIndex].value;
        const secondVal = b.cells[columnIndex].value;

        return typeof column.sortingFn === "function"
          ? column.sortingFn(firstVal, secondVal)
          : firstVal.localeCompare(secondVal);
      });

      if (sortingOrder.value === "desc") {
        rows.value.reverse();
      }
    }

    if (sortedBy.value === null) {
      // it's first-time-sorting

      sort();
      sortedBy.value = column;
    } else if (sortedBy.value.key !== column.key) {
      // trying to sort by another column

      sort();
      sortedBy.value = column;
    } else if (sortedBy.value.key === column.key) {
      // already sorted by the same column

      if (sortingOrder.value === "asc") {
        sortingOrder.value = "desc";
        sort();
      } else {
        sortingOrder.value = "asc";
        sortedBy.value = null;
        restore();
      }
    }
  }

  return {
    sortedBy,
    sortingOrder,
    sortByColumn
  }
}
