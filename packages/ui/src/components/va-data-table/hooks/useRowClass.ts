import { TableRow, TRowClass } from '../types'

interface useRowClassProps {
  rowClass: string | TRowClass | undefined
  [prop: string]: unknown
}

export default function useRowClass (props: useRowClassProps) {
  function getCustomRowClass (row: TableRow) {
    const rowClassType = typeof props.rowClass

    if (rowClassType === 'string') {
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
