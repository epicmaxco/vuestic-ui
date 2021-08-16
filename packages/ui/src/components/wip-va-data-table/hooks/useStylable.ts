import {TableCell, TableRow} from "./useRows";
import {getFocusColor, getHoverColor} from "../../../services/color-config/color-functions";
import {getColor} from "../../../services/color-config/color-config";
import {computed, Ref} from "vue";
import {TableColumn} from "./useColumns";

export default function useStylable(selectable: Ref<boolean>, selectedColor: Ref<string>) {
  function getHeadCSSVariables(column: TableColumn) {
    return {
      "--align": column.alignHead,
      "--vertical-align": column.verticalAlignHead,
      "--cursor": column.sortable ? "pointer" : "default"
    }
  }

  const rowCSSVariables = computed(() => {
    if (selectable.value) {
      return {
        "--hover-color": getHoverColor(getColor(selectedColor.value)),
        "--selected-color": getFocusColor(getColor(selectedColor.value)),
      }
    }
  });

  function getCellCSSVariables(cell: TableCell) {
    return {
      "--align": cell.column.align,
      "--vertical-align": cell.column.verticalAlign
    }
  }

  return {
    getHeadCSSVariables,
    rowCSSVariables,
    getCellCSSVariables
  }
}
