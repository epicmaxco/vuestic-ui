import { computed, inject, onBeforeUnmount, onMounted, provide, Ref, ref, watch, WritableComputedRef } from 'vue'

export const AccordionServiceKey = Symbol('AccordionService')

interface AccordionItemProps {
  inset?: boolean,
  popout?: boolean
}

interface AccordionProps extends AccordionItemProps {
  modelValue: boolean[],
  multiply: boolean,
}

interface AccordtionItem {
  state: WritableComputedRef<boolean>
}

interface AccordionInject {
  onItemMounted: (item: AccordtionItem) => void,
  onItemUnmounted: (item: AccordtionItem) => void,
  onItemChanged: (changedItem: AccordtionItem) => void,
  props: Ref<AccordionItemProps>,
}

/** @param state array of states of all accordion items */
export const useAccordion = (props: AccordionProps, state: WritableComputedRef<boolean[]>) => {
  /** @notice items are reactive because they have reactive `state` inside */
  let items: AccordtionItem[] = []

  const onItemMounted = (item: AccordtionItem) => { items.push(item) }
  const onItemUnmounted = (item: AccordtionItem) => { items = items.filter((i) => i !== item) }
  const onItemChanged = (changedItem: AccordtionItem) => {
    state.value = items
      .map((item: AccordtionItem) => {
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
    items.forEach((item: AccordtionItem, index: number) => {
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
  const accortion = inject<AccordionInject>(AccordionServiceKey, {
    props: ref({ inset: undefined, popout: undefined }),
    onItemChanged: () => undefined,
    onItemMounted: () => undefined,
    onItemUnmounted: () => undefined,
  })

  const item = { state }

  onMounted(() => accortion.onItemMounted(item))
  onBeforeUnmount(() => accortion.onItemUnmounted(item))
  watch(state, () => accortion.onItemChanged(item))

  return {
    accordionProps: accortion.props,
  }
}
