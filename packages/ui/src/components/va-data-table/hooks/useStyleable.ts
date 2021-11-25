import { TableCell } from './useRows'
import { getFocusColor, getHoverColor } from '../../../services/color-config/color-functions'
import { getColor } from '../../../services/color-config/color-config'
import { computed, Ref } from 'vue'
import { TableColumn } from './useColumns'

export default function useStyleable (
  selectable: Ref<boolean>,
  selectedColor: Ref<string>,
  allowFooterSorting: Ref<boolean>,
) {
  function getHeaderCSSVariables (column: TableColumn) {
    return {
      '--align': column.alignHead,
      '--vertical-align': column.verticalAlignHead,
      '--cursor': column.sortable ? 'pointer' : 'default',
    }
  }

  const rowCSSVariables = computed(() => {
    const styles: Record<string, any> = {
      '--hover-color': getHoverColor(getColor(selectedColor.value)),
    }

    if (selectable.value) {
      styles['--selected-color'] = getFocusColor(getColor(selectedColor.value))
    }

    return styles
  })

  function getCellCSSVariables (cell: TableCell) {
    return {
      '--align': cell.column.align,
      '--vertical-align': cell.column.verticalAlign,
    }
  }

  function getFooterCSSVariables (column: TableColumn) {
    return {
      '--align': column.alignHead,
      '--vertical-align': column.verticalAlignHead,
      '--cursor': allowFooterSorting.value && column.sortable ? 'pointer' : 'default',
    }
  }

  return {
    getHeaderCSSVariables,
    rowCSSVariables,
    getCellCSSVariables,
    getFooterCSSVariables,
  }
}
