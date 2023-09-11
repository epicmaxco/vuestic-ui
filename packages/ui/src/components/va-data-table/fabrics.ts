import { StringWithAutocomplete } from '../../utils/types/prop-type'
import { DataTableColumnSource, DataTableItem } from './types'

export const defineVaDataTableColumns = <Key extends string, Columns extends DataTableColumnSource<Key>>(columns: Columns[]) => columns

type ExtractRowsFromColumns<T extends DataTableColumnSource[]> = T extends DataTableColumnSource<infer K>[] ? Record<StringWithAutocomplete<K>, any>[] : never

export const defineVaDataTableItems = <C extends DataTableColumnSource[]>(items: ExtractRowsFromColumns<C>) => items

export type DataTableItems<C extends DataTableColumnSource[]> = ExtractRowsFromColumns<C>
export type DataTableColumns<Item extends Record<string, any>> = DataTableColumnSource<Item extends Record<infer K, any> ? K : string>[]
