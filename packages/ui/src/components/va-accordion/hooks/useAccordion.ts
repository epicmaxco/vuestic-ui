import { computed, inject, onBeforeUnmount, onMounted, provide, Ref, ref, watch, WritableComputedRef } from 'vue'

export const AccordionServiceKey = Symbol('AccordionService')

export interface AccordionItemProps {
  inset?: boolean,
  popout?: boolean
}

export interface AccordionProps extends AccordionItemProps {
  modelValue: boolean[],
  multiply: boolean,
}

export interface AccordionItem {
  state: WritableComputedRef<boolean>
}

export interface AccordionInject {
  onItemMounted: (item: AccordionItem) => void,
  onItemUnmounted: (item: AccordionItem) => void,
  onItemChanged: (changedItem: AccordionItem) => void,
  props: Ref<AccordionItemProps>,
}

/**
 * @param props
 * @param state array of states of all accordion items */
export const useAccordion = (props: AccordionProps, state: WritableComputedRef<boolean[]>) => {
  /** @notice items are reactive because they have reactive `state` inside */
  let items: AccordionItem[] = []

  const onItemMounted = (item: AccordionItem) => { items.push(item) }
  const onItemUnmounted = (item: AccordionItem) => { items = items.filter((i) => i !== item) }
  const onItemChanged = (changedItem: AccordionItem) => {
    state.value = items
      .map((item: AccordionItem) => {
        if (item === changedItem) {
          return item.state.value
        }

        if (!props.multiply) {
          item.state.value = false
        }

        return item.state.value
      })
  }

  provide(AccordionServiceKey, {
    isInsideAccordion: true,
    onItemMounted,
    onItemUnmounted,
    onItemChanged,
    props: computed(() => props),
  })

  const updateItemStates = () => {
    items.forEach((item: AccordionItem, index: number) => {
      item.state.value = state.value[index]
    })
  }

  onMounted(updateItemStates)
  watch(state, updateItemStates)

  return { items }
}

/**
 * Hook used in items that should react on VaAccordion changes
 * @param state shows if accordion item is open
 */
export const useAccordionItem = (state: WritableComputedRef<boolean>) => {
  const accordion = inject<AccordionInject>(AccordionServiceKey, {
    props: ref({ inset: undefined, popout: undefined }),
    onItemChanged: () => undefined,
    onItemMounted: () => undefined,
    onItemUnmounted: () => undefined,
  })

  const item = { state }

  onMounted(() => accordion.onItemMounted(item))
  onBeforeUnmount(() => accordion.onItemUnmounted(item))

  return {
    accordionProps: accordion.props,

    toggle: () => {
      /** Toggle collapse value and notify accordion about it */
      state.value = !state.value
      accordion.onItemChanged(item)
    },
  }
}
