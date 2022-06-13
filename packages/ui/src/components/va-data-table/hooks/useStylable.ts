import { computed } from 'vue'
import { useColors } from '../../../composables/useColor'
import { safeCSSLength } from '../../../utils/css-utils'
import { DataTableColumn, DataTableClassesOptions, DataTableStyleOptions, DataTableCell } from '../types'

const prefix = '--va-data-table'

interface useStylableProps {
  selectable: boolean
  selectedColor: string
  allowFooterSorting: boolean
  stickyHeader: boolean
  height: string | number | undefined
}

function getClasses (classes: DataTableClassesOptions = []): string[] {
  if (typeof classes === 'function') {
    const computedClasses = classes()
    return (typeof computedClasses === 'string') ? [computedClasses] : computedClasses
  }

  return (typeof classes === 'string') ? [classes] : classes
}

function getStyles (styles: DataTableStyleOptions = {}): Record<string, any> {
  return (typeof styles === 'function') ? styles() : styles
}

export default function useStyleable (props: useStylableProps) {
  const { getColor, getFocusColor, getHoverColor, shiftHSLAColor } = useColors()

  const color = computed(() => getColor(props.selectedColor))

  function getHeaderCSSVariables (column: DataTableColumn) {
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

  function getCellCSSVariables (cell: DataTableCell) {
    return {
      [`${prefix}-align`]: cell.column.align,
      [`${prefix}-vertical-align`]: cell.column.verticalAlign,
    }
  }

  function getFooterCSSVariables (column: DataTableColumn) {
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
