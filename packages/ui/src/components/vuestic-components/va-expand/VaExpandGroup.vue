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
      emitValue.push(expand.valueComputed)
      // if (expand === child) {
      //   // inset
      //   if (state && this.c_inset) {
      //     child.$el.style.padding = '1rem'
      //   } else if (state && this.c_popout) {
      //     child.$el.style.padding = '0'
      //   } else {
      //     child.$el.style.padding = '0.5rem'
      //   }
      //   // /inset
      //   return
      // }
      // if (!this.c_multiply) {
      //   (expand as any).valueComputed = false
      //   ;(expand as any).$el.style.padding = '0.5rem'
      // }
    })
    this.valueComputed = emitValue
  }

  mounted () {
    this.$children.forEach((expand, index) => {
      (expand as any).valueComputed = this.valueComputed[index]
    })
    console.log('value', this.valueComputed)
  }

  updated () {
    console.log('value2', this.valueComputed)
  }
}
</script>

<style lang="scss">
.va-expand-group {
}
</style>
