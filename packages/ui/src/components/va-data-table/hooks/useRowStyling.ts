import { TableRow, VaDataTableRowClass, VaDataTableRowStyle } from '../types'

const isFunction = (val: unknown): val is Function => typeof val === 'function'

interface useRowClassProps {
  rowClass: VaDataTableRowClass
  rowStyle: VaDataTableRowStyle
  [prop: string]: unknown
}

export default function useRowStyling (props: useRowClassProps) {
  const getCustomRowClass = (row: TableRow) => isFunction(props.rowClass)
    ? props.rowClass(row.source, row.initialIndex)
    : props.rowClass

  const getCustomRowStyle = (row: TableRow) => isFunction(props.rowStyle)
    ? props.rowStyle(row.source, row.initialIndex)
    : props.rowStyle

  return {
    getCustomRowClass,
    getCustomRowStyle,
  }
}
