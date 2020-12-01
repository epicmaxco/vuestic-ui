<template>
  <div class="va-accordion">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Mixins, Provide } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { Options } from 'vue-class-component'

const PropsMixin = makeContextablePropsMixin({
  value: { type: Array, default: () => [] },
  multiply: { type: Boolean, default: false },
  inset: { type: Boolean, default: false },
  popout: { type: Boolean, default: false },
})

@Options({
  name: 'VaAccordion',
})
export default class VaAccordion extends Mixins(
  StatefulMixin,
  PropsMixin,
) {
  collapses: any[] = []
  @Provide() accordion = {
    onChildChange: (child: any, state: any) => this.onChildChange(child, state),
    onChildMounted: (child: any) => this.onChildMounted(child),
  }

  onChildChange (child: any, state: any) {
    const emitValue: any = []
    this.collapses.forEach((collapse: any) => {
      if (collapse === child) {
        emitValue.push((collapse as any).valueProxy)
        return
      }
      if (!this.c_multiply) {
        (collapse as any).valueProxy = false
      }
      emitValue.push((collapse as any).valueProxy)
    })
    this.valueComputed = emitValue
  }

  onChildMounted (collapse: any) {
    this.collapses.push(collapse)
  }

  mounted () {
    this.collapses.forEach((collapse: any, index: number) => {
      collapse.valueProxy = this.valueComputed[index]
    })
  }

  updated () {
    this.collapses.forEach((collapse: any, index: number) => {
      collapse.valueProxy = this.valueComputed[index]
    })
  }
}
</script>

<style lang="scss">
.va-accordion {
}
</style>
