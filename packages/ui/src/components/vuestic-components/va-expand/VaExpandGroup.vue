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
    this.valueComputed = !this.valueComputed
    this.$children.forEach(expand => {
      if (expand === child) {
        return
      }
      if (!this.c_multiply) {
        (expand as any).valueComputed = false
      }
    })
  }
}
</script>

<style lang="scss">
.va-expand-group {
}
</style>
