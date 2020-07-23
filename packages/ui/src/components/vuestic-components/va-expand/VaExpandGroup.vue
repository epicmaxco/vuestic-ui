<template>
  <div class="va-expand-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins, Provide } from 'vue-property-decorator'
import { StatefulMixin } from './StatefulExpandMixin'

const ExpandGroupPropsMixin = makeContextablePropsMixin({
  multiply: { type: Boolean, default: false },
  inset: { type: Boolean, default: false },
  popout: { type: Boolean, default: false },
})

@Component({
  name: 'VaExpandGroup',
})
export default class VaExpandGroup extends Mixins(
  StatefulMixin,
  ExpandGroupPropsMixin,
) {
  @Provide() accordion = {
    onChildChange: (child: any, state: any) => this.onChildChange(child, state),
  }

  onChildChange (child: any, state: any) {
    const emitValue: any = []
    this.$children.forEach(expand => {
      if (expand === child) {
        emitValue.push((expand as any).valueComputed)
        return
      }
      if (!this.c_multiply) {
        (expand as any).valueComputed = false
      }
      emitValue.push((expand as any).valueComputed)
    })
    this.valueComputed = emitValue
  }

  mounted () {
    this.$children.forEach((expand, index) => {
      (expand as any).valueComputed = this.valueComputed[index]
    })
  }

  updated () {
    this.$children.forEach((expand, index) => {
      (expand as any).valueComputed = this.valueComputed[index]
    })
  }
}
</script>

<style lang="scss">
.va-expand-group {
}
</style>
