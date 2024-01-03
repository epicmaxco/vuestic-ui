import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, Ref, ref, watch, WritableComputedRef } from 'vue'
import { warn } from '../../../utils/console'

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
  const items = ref<AccordionItem[]>([])

  const getItemValue = (item: AccordionItem) => {
    return state.value[items.value.indexOf(item)] ?? false
  }

  const onItemsChanged = () => {
    state.value = items.value.map((item) => getItemValue(item))
  }

  const onItemMounted = (item: AccordionItem) => {
    items.value.push(item)
    onItemsChanged()
  }
  const onItemUnmounted = (item: AccordionItem) => {
    items.value = items.value.filter((i) => i !== item)
    // Prevent recursive dom update on unmount (HRM)
    nextTick(onItemsChanged)
  }

  const setItemValue = (item: AccordionItem, value: boolean) => {
    const index = items.value.indexOf(item)
    if (index === -1) {
      warn('Accordion item is not registered yet')
      return
    }

    if (!props.multiple) {
      state.value = state.value.map((el, i) => {
        if (i === index) { return value }
        return false
      })
    } else {
      state.value[index] = value
    }
  }

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
  const accordion = inject<AccordionInject | undefined>(AccordionServiceKey, undefined)

  if (!accordion) {
    return { accordionProps: ref({} as AccordionProps) }
  }

  const item = {}

  onMounted(() => accordion.onItemMounted(item))
  onBeforeUnmount(() => accordion.onItemUnmounted(item))

  const accordionItemValue = computed({
    get: () => accordion.getItemValue(item),
    set: (value) => accordion.setItemValue(item, value),
  })

  return {
    accordionItemValue,
    accordionProps: accordion.props,
  }
}
