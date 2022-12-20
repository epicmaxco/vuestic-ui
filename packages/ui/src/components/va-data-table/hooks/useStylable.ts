import { computed, PropType, ExtractPropTypes } from 'vue'

import { safeCSSLength } from '../../../utils/css'
import { useColors } from '../../../composables'
import { useSelectableProp } from './useCommonProps'

import type {
  DataTableColumnInternal,
  DataTableColumnClass,
  DataTableColumnStyle,
  DataTableCell,
} from '../types'

const prefix = '--va-data-table'

const isFunction = (val: unknown): val is Function => typeof val === 'function'

export const useStylableProps = {
  ...useSelectableProp,
  selectedColor: { type: String, default: 'primary' },
  allowFooterSorting: { type: Boolean, default: false },
  stickyHeader: { type: Boolean, default: false },
  stickyFooter: { type: Boolean, default: false },
  height: { type: [String, Number] as PropType<string | number | undefined> },
}

const getClass = (classes: DataTableColumnClass) => isFunction(classes) ? classes() : classes
const getStyle = (styles: DataTableColumnStyle) => isFunction(styles) ? styles() : styles

export const useStylable = (props: ExtractPropTypes<typeof useStylableProps>) => {
  const { getColor, getFocusColor, getHoverColor } = useColors()

  const color = computed(() => getColor(props.selectedColor))

  const CSSVariables = computed(() => ({
    hoverColor: getHoverColor(color.value),
    selectedColor: props.selectable ? getFocusColor(color.value) : undefined,
    tableHeight: props.height ? safeCSSLength(props.height) : 'var(--va-data-table-height)',
    theadBg: props.stickyHeader
      ? 'var(--va-data-table-thead-background, var(--va-data-table-header-background))'
      : 'var(--va-data-table-thead-background)',
    tfootBg: props.stickyFooter
      ? 'var(--va-data-table-tfoot-background, var(--va-data-table-header-background))'
      : 'var(--va-data-table-tfoot-background)',
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
    CSSVariables,
    getHeaderCSSVariables,
    getCellCSSVariables,
    getFooterCSSVariables,
    getClass,
    getStyle,
  }
}
