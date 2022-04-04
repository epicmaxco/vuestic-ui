import { computed } from 'vue'
import { useColors } from '../../../composables/useColor'
import { safeCSSLength } from '../../../utils/css-utils'
import { TableColumn, TClassesOptions, TStyleOptions, TableCell } from '../types'
interface useStyleableProps {
  selectable: boolean
  selectedColor: string
  allowFooterSorting: boolean
  stickyHeader: boolean
  height: string | number | undefined
}

function getClasses (classes: TClassesOptions = []): string[] {
  if (typeof classes === 'function') {
    const computedClasses = classes()
    return (typeof computedClasses === 'string') ? [computedClasses] : computedClasses
  }

  return (typeof classes === 'string') ? [classes] : classes
}

function getStyles (styles: TStyleOptions = {}): Record<string, any> {
  return (typeof styles === 'function') ? styles() : styles
}

export default function useStyleable (props: useStyleableProps) {
  const { getColor, getFocusColor, getHoverColor, shiftHSLAColor } = useColors()

  const color = computed(() => getColor(props.selectedColor))

  function getHeaderCSSVariables (column: TableColumn) {
    return {
      '--width': typeof column.width === 'string' ? column.width : `${column.width}px`,
      '--align': column.alignHead,
      '--vertical-align': column.verticalAlignHead,
      '--cursor': column.sortable ? 'pointer' : 'default',
    }
  }

  const rowCSSVariables = computed(() => {
    const styles: Record<string, any> = {
      '--hover-color': getHoverColor(color.value),
    }

    if (props.selectable) {
      styles['--selected-color'] = getFocusColor(color.value)
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
      '--cursor': props.allowFooterSorting && column.sortable ? 'pointer' : 'default',
    }
  }

  function getStickyCSSVariables () {
    return {
      '--scroll-table-color': (props.height || props.stickyHeader) && shiftHSLAColor(color.value, { l: 20 }),
      '--scroll-table-height': props.height && safeCSSLength(props.height),
    }
  }

  return {
    getHeaderCSSVariables,
    rowCSSVariables,
    getCellCSSVariables,
    getFooterCSSVariables,
    getStickyCSSVariables,
    getClasses,
    getStyles,
  }
}
