import { PropType } from 'vue'

import { DataTableItem } from '../types'

export const currentPage = { currentPage: { type: Number as PropType<number | undefined> } }

export const items = { items: { type: Array as PropType<DataTableItem[]>, default: () => [] as DataTableItem[] } }

export const selectable = { selectable: { type: Boolean, default: false } }

export const itemsTrackBy = { itemsTrackBy: { type: [String, Function] as PropType<string | ((item: DataTableItem) => any)>, default: '' } }
