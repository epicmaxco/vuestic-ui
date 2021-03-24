<template>
  <div class="va-accordion">
    <slot />
  </div>
</template>

<script lang="ts">
import { provide } from 'vue'
import { Options, Vue, mixins, prop, setup } from 'vue-class-component'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import Collapse from '../va-collapse/VaCollapse.vue'

export const AccordionServiceKey = Symbol('AccordionService')

const PropsMixin = Vue.with(class{
  value = prop<any[]>({ type: Array, default: () => [] })
  multiply = prop<boolean>({ type: Boolean, default: false })
  inset = prop<boolean>({ type: Boolean, default: false })
  popout = prop<boolean>({ type: Boolean, default: false })
})

export type Accordion = {
  isInsideAccordion: boolean;
  getProps: () => any;
  getState: () => any;
  onChildChange: (child: Collapse) => void;
  onChildMounted: (child: Collapse) => void;
  onChildUnmounted: (child: Collapse) => void;
}

@Options({
  name: 'VaAccordion',
})
export default class VaAccordion extends mixins(
  StatefulMixin,
  PropsMixin,
) {
  collapses: any[] = []

  accordion = setup(() => {
    const accordion: Accordion = {
      isInsideAccordion: true,
      getProps: () => this.getProps(),
      getState: () => this.getState(),
      onChildChange: (child: Collapse) => this.onChildChange(child),
      onChildMounted: (child: Collapse) => this.onChildMounted(child),
      onChildUnmounted: (child: Collapse) => this.onChildUnmounted(child),
    }

    provide(AccordionServiceKey, accordion)

    return accordion
  })

  onChildChange (child: Collapse) {
    const emitValue: any = []
    this.collapses.forEach((collapse: Collapse) => {
      if (collapse === child) {
        emitValue.push(collapse.valueProxy)
        return
      }

      if (!this.multiply) {
        collapse.valueProxy = false
      }

      emitValue.push(collapse.valueProxy)
    })

    this.valueComputed = emitValue
  }

  getProps () {
    return {
      inset: this.inset,
      popout: this.popout,
    }
  }

  getState () {
    return this.valueComputed
  }

  onChildMounted (collapse: Collapse) {
    this.collapses.push(collapse)
  }

  onChildUnmounted (removableCollapse: Collapse) {
    this.collapses = this.collapses.filter(collapse => collapse !== removableCollapse)
  }

  mounted () {
    this.collapses.forEach((collapse: Collapse, index: number) => {
      collapse.valueProxy = this.valueComputed[index]
    })
  }

  updated () {
    this.collapses.forEach((collapse: Collapse, index: number) => {
      collapse.valueProxy = this.valueComputed[index]
    })
  }
}
</script>

<style lang="scss">
.va-accordion {
}
</style>
