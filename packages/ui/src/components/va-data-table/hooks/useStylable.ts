import { computed } from 'vue'

import { safeCSSLength } from '../../../utils/css-utils'
import { useColors } from '../../../composables'

import type {
  DataTableColumnInternal,
  DataTableColumnClass,
  DataTableColumnStyle,
  DataTableCell,
} from '../types'

const prefix = '--va-data-table'

const isFunction = (val: unknown): val is Function => typeof val === 'function'

interface useStylableProps {
  selectable: boolean
  selectedColor: string
  allowFooterSorting: boolean
  stickyHeader: boolean
  stickyFooter: boolean
  height: string | number | undefined
}

const getClass = (classes: DataTableColumnClass) => isFunction(classes) ? classes() : classes
const getStyle = (styles: DataTableColumnStyle) => isFunction(styles) ? styles() : styles

export default function useStyleable (props: useStylableProps) {
  const { getColor, getFocusColor, getHoverColor, shiftHSLAColor } = useColors()

  const color = computed(() => getColor(props.selectedColor))

  const rowCSSVariables = computed(() => ({
    [`${prefix}-hover-color`]: getHoverColor(color.value),
    [`${prefix}-selected-color`]: props.selectable ? getFocusColor(color.value) : undefined,
  }))

  const stickyCSSVariables = computed(() => ({
    [`${prefix}-scroll-table-color`]: (props.height || props.stickyHeader || props.stickyFooter) && shiftHSLAColor(color.value, { l: 40 }),
    [`${prefix}-scroll-table-height`]: props.height ? safeCSSLength(props.height) : undefined,
  }))

  const getHeaderCSSVariables = (column: DataTableColumnInternal) => ({
    [`${prefix}-width`]: column.width && safeCSSLength(column.width),
    [`${prefix}-align`]: column.thAlign,
    [`${prefix}-vertical-align`]: column.thVerticalAlign,
    [`${prefix}-cursor`]: column.sortable ? 'pointer' : 'default',
  })

  const getCellCSSVariables = (cell: DataTableCell) => ({
    [`${prefix}-align`]: cell.column.tdAlign,
    [`${prefix}-vertical-align`]: cell.column.tdVerticalAlign,
  })

  const getFooterCSSVariables = (column: DataTableColumnInternal) => ({
    [`${prefix}-align`]: column.thAlign,
    [`${prefix}-vertical-align`]: column.thVerticalAlign,
    [`${prefix}-cursor`]: props.allowFooterSorting && column.sortable ? 'pointer' : 'default',
  })

  return {
    rowCSSVariables,
    stickyCSSVariables,
    getHeaderCSSVariables,
    getCellCSSVariables,
    getFooterCSSVariables,
    getClass,
    getStyle,
  }
}
