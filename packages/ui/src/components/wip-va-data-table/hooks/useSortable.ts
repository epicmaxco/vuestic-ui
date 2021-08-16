import {TableColumn} from "./useColumns";
import {ref, Ref} from "vue";
import {TableRow} from "./useRows";
import {cloneDeep} from "lodash-es";

export type TSortingOrderOptions = "asc" | "desc";

export default function useSortable(columns: Ref<TableColumn[]>, rows: Ref<TableRow[]>) {
  const initiallyOrderedRows = rows.value.slice();

  const sortedBy = ref<TableColumn| null>(null);
  const sortingOrder = ref<TSortingOrderOptions>("asc");

  function sortByColumn(column: TableColumn) {
    const columnIndex = columns.value.indexOf(column);

    function restore() {
      rows.value.splice(0, rows.value.length, ...initiallyOrderedRows);
    }

    function sort() {
      if (sortingOrder.value === "asc") {
        rows.value = rows.value.sort((a, b) => {
          return a.cells[columnIndex].value.localeCompare(b.cells[columnIndex].value);
        });
      } else {
        rows.value.reverse();
      }
    }

    if (sortedBy.value === null || sortedBy.value.key !== column.key) {
      // trying to sort by another column or it's first-time-sorting

      sortingOrder.value = "asc";
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
