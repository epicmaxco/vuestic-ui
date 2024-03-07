import { PropType } from 'vue'

import { DataTableItem } from '../types'

export const useCurrentPageProp = { currentPage: { type: Number as PropType<number | undefined> } }

export const createItemsProp = <T>() => ({
  items: { type: Array as PropType<DataTableItem<T>[]>, default: () => [] as DataTableItem<T>[] },
})

export const useSelectableProp = { selectable: { type: Boolean, default: false } }

export const useItemsTrackByProp = { itemsTrackBy: { type: [String, Function] as PropType<string | ((item: DataTableItem) => any)>, default: '' } }
