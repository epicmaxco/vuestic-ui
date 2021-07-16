import { computed, toRefs, provide, watch, Slots, ComputedRef } from 'vue'
import { useSyncProp } from './sync-prop'
import { VaDataTableFooter } from '../index'

export function useDataTablePagination (props: Record<string, any>, emit: (event: any, newValue: any) => any, slots: Slots, items: ComputedRef<Object[]>) {
  const { page, itemsPerPage, itemsLength } = toRefs(props)
  // The next line is needed to separate the data table and footer props, thanks to this we can customize the footer using the footer component (see the `footer settings` demo)
  // * perhaps this is redundant functionality
  const paginationProps = computed(() => slots.default?.().find(child => child.type === VaDataTableFooter)?.props)
  const { syncProp: currentPage } = useSyncProp<number, string>(page, 'page', emit, 1)
  const { syncProp: currentItemsPerPage } = useSyncProp<number, string>(itemsPerPage, 'itemsPerPage', emit, 5)
  const moreThanOnePage = computed(() => currentItemsPerPage.value > 0 && items.value.length > currentItemsPerPage.value)
  watch(currentItemsPerPage, (newValue, oldValue) => {
    if (moreThanOnePage.value) {
      const oldStartPosition = (currentPage.value - 1) * oldValue
      currentPage.value = Math.ceil((oldStartPosition + 1) / newValue)
      return
    }
    currentPage.value = 1
  })
  const paginationTotal = computed(() => {
    if (moreThanOnePage.value) {
      const itemsLength = props.itemsLength || props.items.length
      return Math.ceil(itemsLength / currentItemsPerPage.value)
    }
    return 1
  })
  const filteredItems = computed(() => {
    if (!itemsLength.value && moreThanOnePage.value) {
      const startPosition = (currentPage.value - 1) * currentItemsPerPage.value
      const endPosition = startPosition + currentItemsPerPage.value
      return items.value.slice(startPosition, endPosition)
    }
    return items.value
  })
  // `provide` is used to remove these props from the footer component and not confuse the user when they customize the footer
  provide('page', currentPage)
  provide('itemsPerPage', currentItemsPerPage)
  provide('paginationTotal', paginationTotal)

  return {
    filteredItems,
    paginationProps,
  }
}

export const paginationOptions = {
  props: {
    page: {
      type: Number,
      default: undefined,
    },
    itemsPerPage: {
      type: Number,
      default: undefined,
    },
    itemsLength: {
      type: Number,
      default: undefined,
    },
  },
  emits: ['update:page', 'update:itemsPerPage'],
}
