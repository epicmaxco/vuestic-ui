import { computed } from 'vue'
import { useColors } from '../../../composables/useColor'
import { safeCSSLength } from '../../../utils/css-utils'
import { TableColumn, TClassesOptions, TStyleOptions, TableCell } from '../types'

const prefix = '--va-data-table'

interface useStyleableProps {
  selectable: boolean
  selectedColor: string
  allowFooterSorting: boolean
  stickyHeader: boolean
  height: string | number | undefined
  [prop: string]: unknown
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

const { getColor, getFocusColor, getHoverColor, shiftHSLAColor } = useColors()

export default function useStyleable (props: useStyleableProps) {
  const color = computed(() => getColor(props.selectedColor))

  function getHeaderCSSVariables (column: TableColumn) {
    return {
      [`${prefix}-width`]: typeof column.width === 'string' ? column.width : `${column.width}px`,
      [`${prefix}-align`]: column.alignHead,
      [`${prefix}-vertical-align`]: column.verticalAlignHead,
      [`${prefix}-cursor`]: column.sortable ? 'pointer' : 'default',
    }
  }

  const rowCSSVariables = computed(() => {
    const styles: Record<string, any> = {
      [`${prefix}-hover-color`]: getHoverColor(color.value),
    }

    if (props.selectable) {
      styles[`${prefix}-selected-color`] = getFocusColor(color.value)
    }

    return styles
  })

  function getCellCSSVariables (cell: TableCell) {
    return {
      [`${prefix}-align`]: cell.column.align,
      [`${prefix}-vertical-align`]: cell.column.verticalAlign,
    }
  }

  function getFooterCSSVariables (column: TableColumn) {
    return {
      [`${prefix}-align`]: column.alignHead,
      [`${prefix}-vertical-align`]: column.verticalAlignHead,
      [`${prefix}-cursor`]: props.allowFooterSorting && column.sortable ? 'pointer' : 'default',
    }
  }

  function getStickyCSSVariables () {
    return {
      [`${prefix}-scroll-table-color`]: (props.height || props.stickyHeader) && shiftHSLAColor(color.value, { l: 20 }),
      [`${prefix}-scroll-table-height`]: props.height && safeCSSLength(props.height),
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
