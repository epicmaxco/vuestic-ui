import { computed } from 'vue'
import { useColors } from '../../../composables/useColor'
import { safeCSSLength } from '../../../utils/css-utils'
import {
  TableColumn,
  TableRow,
  VaDataTableColumnClass,
  VaDataTableColumnStyle,
  TableCell,
  VaDataTableRowClass,
  VaDataTableRowStyle,
} from '../types'

const prefix = '--va-data-table'

const isFunction = (val: unknown): val is Function => typeof val === 'function'

interface useStylableProps {
  selectable: boolean
  selectedColor: string
  allowFooterSorting: boolean
  stickyHeader: boolean
  height: string | number | undefined
  rowClass: VaDataTableRowClass
  rowStyle: VaDataTableRowStyle
}

const getClass = (classes: VaDataTableColumnClass) => isFunction(classes) ? classes() : classes
const getStyle = (styles: VaDataTableColumnStyle) => isFunction(styles) ? styles() : styles

export default function useStyleable (props: useStylableProps) {
  const { getColor, getFocusColor, getHoverColor, shiftHSLAColor } = useColors()

  const color = computed(() => getColor(props.selectedColor))

  const getHeaderCSSVariables = (column: TableColumn) => ({
    [`${prefix}-width`]: column.width && safeCSSLength(column.width),
    [`${prefix}-align`]: column.alignHead,
    [`${prefix}-vertical-align`]: column.verticalAlignHead,
    [`${prefix}-cursor`]: column.sortable ? 'pointer' : 'default',
  })

  const rowCSSVariables = computed(() => ({
    [`${prefix}-hover-color`]: getHoverColor(color.value),
    ...(props.selectable && { [`${prefix}-selected-color`]: getFocusColor(color.value) }),
  }))

  const getCellCSSVariables = (cell: TableCell) => ({
    [`${prefix}-align`]: cell.column.align,
    [`${prefix}-vertical-align`]: cell.column.verticalAlign,
  })

  const getFooterCSSVariables = (column: TableColumn) => ({
    [`${prefix}-align`]: column.alignHead,
    [`${prefix}-vertical-align`]: column.verticalAlignHead,
    [`${prefix}-cursor`]: props.allowFooterSorting && column.sortable ? 'pointer' : 'default',
  })

  const getStickyCSSVariables = () => ({
    [`${prefix}-scroll-table-color`]: (props.height || props.stickyHeader) && shiftHSLAColor(color.value, { l: 20 }),
    [`${prefix}-scroll-table-height`]: props.height && safeCSSLength(props.height),
  })

  const getCustomRowClass = (row: TableRow) => isFunction(props.rowClass)
    ? props.rowClass(row.source, row.initialIndex)
    : props.rowClass

  const getCustomRowStyle = (row: TableRow) => isFunction(props.rowStyle)
    ? props.rowStyle(row.source, row.initialIndex)
    : props.rowStyle

  return {
    getHeaderCSSVariables,
    rowCSSVariables,
    getCellCSSVariables,
    getFooterCSSVariables,
    getStickyCSSVariables,
    getClass,
    getStyle,
    getCustomRowClass,
    getCustomRowStyle,
  }
}
