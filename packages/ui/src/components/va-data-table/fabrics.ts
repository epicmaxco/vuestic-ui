import { DataTableColumnSource } from './types'

export const defineVaDataTableColumns = <Key extends string, Columns extends DataTableColumnSource<Key>>(columns: Columns[]) => columns

type ExtractRowsFromColumns<T extends DataTableColumnSource[]> = T extends DataTableColumnSource<infer K>[] ? Record<K, any>[] : never

export const defineVaDataTableItems = <C extends DataTableColumnSource[]>(items: ExtractRowsFromColumns<C>) => items
