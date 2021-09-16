import { TableCell } from './useRows'
import { getFocusColor, getHoverColor } from '../../../services/color-config/color-functions'
import { getColor } from '../../../services/color-config/color-config'
import { computed, Ref } from 'vue'
import { TableColumn } from './useColumns'

export default function useStyleable (
  hoverable: Ref<boolean>,
  selectable: Ref<boolean>,
  selectedColor: Ref<string>,
  allowFootSorting: Ref<boolean>,
) {
  function getHeadCSSVariables (column: TableColumn) {
    return {
      '--align': column.alignHead,
      '--vertical-align': column.verticalAlignHead,
      '--cursor': column.sortable ? 'pointer' : 'default',
    }
  }

  const rowCSSVariables = computed(() => {
    if (selectable.value) {
      return {
        '--hover-color': getHoverColor(getColor(selectedColor.value)),
        '--selected-color': getFocusColor(getColor(selectedColor.value)),
      }
    }

    if (hoverable.value) {
      return {
        '--hover-color': getHoverColor(getColor(selectedColor.value)),
      }
    }

    return {}
  })

  function getCellCSSVariables (cell: TableCell) {
    return {
      '--align': cell.column.align,
      '--vertical-align': cell.column.verticalAlign,
    }
  }

  function getFootCSSVariables (column: TableColumn) {
    return {
      '--align': column.alignHead,
      '--vertical-align': column.verticalAlignHead,
      '--cursor': allowFootSorting.value && column.sortable ? 'pointer' : 'default',
    }
  }

  return {
    getHeadCSSVariables,
    rowCSSVariables,
    getCellCSSVariables,
    getFootCSSVariables,
  }
}
