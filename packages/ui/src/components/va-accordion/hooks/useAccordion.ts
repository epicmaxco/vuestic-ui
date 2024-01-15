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
  registerItem: (item: AccordionItem) => void,
  unregisterItem: (item: AccordionItem) => void,
  getItemValue: (item: AccordionItem) => boolean,
  setItemValue: (item: AccordionItem, value: boolean) => void,
  props: Ref<AccordionItemProps>,
}

/**
 * @param props
 * @param state array of states of all accordion items */
export const useAccordion = (props: AccordionProps, state: WritableComputedRef<boolean[]>) => {
  const items = ref<AccordionItem[]>([])

  /**
   * In case if items count is bigger than state count, we need to fill state with false values
   * In case if items count is smaller than state count, we assume that some items were not rendered yet
   */
  const makeState = () => {
    const correctItemsCount = Math.max(items.value.length, state.value.length)

    return Array.from({ length: correctItemsCount }, (_, index) => {
      return state.value[index] ?? false
    })
  }

  const getItemValue = (item: AccordionItem) => {
    return state.value[items.value.indexOf(item)] ?? false
  }

  const onItemsChanged = () => {
    state.value = makeState()
  }

  const registerItem = (item: AccordionItem) => {
    items.value.push(item)
    onItemsChanged()
  }
  const unregisterItem = (item: AccordionItem) => {
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
      state.value = makeState().map((el, i) => {
        if (i === index) { return value }
        return false
      })
    } else {
      state.value[index] = value
    }
  }

  provide(AccordionServiceKey, {
    registerItem,
    unregisterItem,
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

  // Register in setup function, before item is mounted,
  // otherwise item will be rendered with own value
  // and re-rendered with accordion value after mounted
  accordion.registerItem(item)
  onBeforeUnmount(() => accordion.unregisterItem(item))

  const accordionItemValue = computed({
    get: () => accordion.getItemValue(item),
    set: (value) => accordion.setItemValue(item, value),
  })

  return {
    accordionItemValue,
    accordionProps: accordion.props,
  }
}
