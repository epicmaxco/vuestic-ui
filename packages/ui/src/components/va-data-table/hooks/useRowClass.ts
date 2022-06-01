import { TableRow, VaDataTableRowClass } from '../types'

interface useRowClassProps {
  rowClass: VaDataTableRowClass
  [prop: string]: unknown
}

export default function useRowClass (props: useRowClassProps) {
  function getCustomRowClass (row: TableRow) {
    if (typeof props.rowClass === 'string') {
      return props.rowClass
    }

    if (typeof props.rowClass === 'function') {
      return props.rowClass(row.source, row.initialIndex)
    }

    return ''
  }

  return {
    getCustomRowClass,
  }
}
