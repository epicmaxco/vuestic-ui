<template>
  <div class="va-expand-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import { Mixins, Provide } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'

const ExpandGroupPropsMixin = makeContextablePropsMixin({
  value: { type: Array, default: () => [] },
  multiply: { type: Boolean, default: false },
  inset: { type: Boolean, default: false },
  popout: { type: Boolean, default: false },
})

@Options({
  name: 'VaExpandGroup',
})
export default class VaExpandGroup extends Mixins(
  StatefulMixin,
  ExpandGroupPropsMixin,
) {
  @Provide() accordion = {
    onChildChange: (child: any, state: any) => this.onChildChange(child, state),
  }

  children () {
    return this.$slots ? (this.$slots as any).default() : []
  }

  onChildChange (child: any, state: any) {
    const emitValue: any = []
    this.children().forEach((expand: any) => {
      if (expand === child) {
        emitValue.push(expand.childValue)
        return
      }
      if (!this.c_multiply) {
        expand.childValue = false
      }
      emitValue.push(expand.childValue)
    })
    this.valueComputed = emitValue
  }

  mounted () {
    this.children().forEach((expand: any, index: string|number) => {
      expand.childValue = this.valueComputed[index]
    })
  }

  updated () {
    this.children().forEach((expand: any, index: string|number) => {
      expand.childValue = this.valueComputed[index]
    })
  }
}
</script>

<style lang="scss">
.va-expand-group {
}
</style>
