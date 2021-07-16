export default class DataTableHeader {
  sortable = true
  align?: 'start' | 'center' | 'end'
  class?: string | string[]
  cellClass?: string | string[]
  sort?: (a: any, b: any) => number

  constructor (public key: string, public label: string) {
  }
}
