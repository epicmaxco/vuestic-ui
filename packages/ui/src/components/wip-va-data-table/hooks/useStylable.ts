import {TableRow} from "./useRows";
import {getFocusColor, getHoverColor} from "../../../services/color-config/color-functions";
import {getColor} from "../../../services/color-config/color-config";
import {computed, Ref} from "vue";

export default function useStylable(selectable: Ref<boolean>, selectedColor: Ref<string>) {
  const rowCSSVariables = computed(() => {
    if (selectable.value) {
      return {
        "--hover-color": getHoverColor(getColor(selectedColor.value)),
        "--selected-color": getFocusColor(getColor(selectedColor.value)),
      }
    }
  });

  return {
    rowCSSVariables
  }
}
