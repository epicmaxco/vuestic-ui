import { computed, inject, onBeforeUnmount, onMounted, provide, Ref, ref, watch, WritableComputedRef } from 'vue'

export const AccordionServiceKey = Symbol('AccordionService')

export interface AccordionItemProps {
  inset?: boolean,
  popout?: boolean
}

export interface AccordionProps extends AccordionItemProps {
  modelValue: boolean[],
  multiple: boolean,
}

export type AccordionItem = {}

export interface AccordionInject {
  onItemMounted: (item: AccordionItem) => void,
  onItemUnmounted: (item: AccordionItem) => void,
  getItemValue: (item: AccordionItem) => boolean,
  setItemValue: (item: AccordionItem, value: boolean) => void,
  props: Ref<AccordionItemProps>,
}

/**
 * @param props
 * @param state array of states of all accordion items */
export const useAccordion = (props: AccordionProps, state: WritableComputedRef<boolean[]>) => {
  /** @notice items are reactive because they have reactive `state` inside */
  const items = ref<AccordionItem[]>([])

  const onItemMounted = (item: AccordionItem) => { items.value.push(item) }
  const onItemUnmounted = (item: AccordionItem) => { items.value = items.value.filter((i) => i !== item) }

  const getItemValue = (item: AccordionItem) => {
    return state.value[items.value.indexOf(item)] ?? false
  }

  const setItemValue = (item: AccordionItem, value: boolean) => {
    const index = items.value.indexOf(item)
    if (index === -1) { return }

    if (!props.multiple) {
      state.value = state.value.map((el, i) => {
        if (i === index) { return value }
        return false
      })
    } else {
      state.value[index] = value
    }
  }

  watch(items, (newItems) => {
    state.value = newItems.map((item) => getItemValue(item))
  }, { deep: true })

  provide(AccordionServiceKey, {
    isInsideAccordion: true,
    onItemMounted,
    onItemUnmounted,
    getItemValue,
    setItemValue,
    props: computed(() => props),
  })

  return { items }
}

/**
 * Hook used in items that should react on VaAccordion changes
 * @param state shows if accordion item is open
 */
export const useAccordionItem = () => {
  const accordion = inject<AccordionInject | null>(AccordionServiceKey, null)

  if (!accordion) {
    return { accordionProps: ref({} as AccordionProps) }
  }

  const item = {}

  onMounted(() => accordion.onItemMounted(item))
  onBeforeUnmount(() => accordion.onItemUnmounted(item))

  const valueProxy = computed({
    get: () => accordion.getItemValue(item),
    set: (value) => accordion.setItemValue(item, value),
  })

  return {
    valueProxy,
    accordionProps: accordion.props,
  }
}
