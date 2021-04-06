<template>
  <div class="va-accordion">
    <slot />
  </div>
</template>

<script lang="ts">
import { useStateful } from '../../vuestic-mixins/StatefulMixin/cStatefulMixin'
import { provide, defineComponent, ref, onMounted, onUpdated } from 'vue'
import Collapse from '../va-collapse/VaCollapse.vue'

export const AccordionServiceKey = Symbol('AccordionService')

export type Accordion = {
  isInsideAccordion: boolean;
  getProps: () => any;
  getState: () => any;
  onChildChange: (child: Collapse) => void;
  onChildMounted: (child: Collapse) => void;
  onChildUnmounted: (child: Collapse) => void;
}

export default defineComponent({
  emits: ['update:modelValue', 'hello'],
  props: {
    modelValue: { type: Array, default: () => [] },
    multiply: { type: Boolean, default: false },
    inset: { type: Boolean, default: false },
    popout: { type: Boolean, default: false },
  },
  setup (props, ctx) {
    const statefull = useStateful(props, ctx.emit)
    const collapses = ref<Collapse[]>([])

    const getProps = () => ({ inset: props.inset, popout: props.popout })
    const onChildMounted = (child: Collapse) => { collapses.value.push(child) }
    const onChildUnmounted = (child: Collapse) => {
      collapses.value = collapses.value.filter(collapse => collapse !== child)
    }
    const onChildChange = (child: Collapse) => {
      const accordionValues = collapses.value.map((collapse: Collapse) => {
        if (collapse === child) {
          return collapse.valueProxy
        }

        if (!props.multiply) {
          collapse.valueProxy = false
        }

        return collapse.valueProxy
      })

      statefull.valueComputed.value = accordionValues
    }

    const accordion = {
      isInsideAccordion: true,
      getProps,
      getState: () => statefull.valueComputed,
      onChildMounted,
      onChildUnmounted,
      onChildChange,
    }

    provide(AccordionServiceKey, accordion)

    const updateCollapsesValues = () => {
      collapses.value.forEach((collapse: Collapse, index: number) => {
        collapse.valueProxy = statefull.valueComputed.value[index]
      })
    }

    onMounted(updateCollapsesValues)
    onUpdated(updateCollapsesValues)

    return { collapses, value: statefull.valueComputed }
  },
})
</script>

<style lang="scss">
.va-accordion {
}
</style>
