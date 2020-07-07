<template>
  <div class="va-expand-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins, Provide } from 'vue-property-decorator'

const ExpandGroupPropsMixin = makeContextablePropsMixin({
})

@Component({
  name: 'VaExpandGroup',
})
export default class VaExpandGroup extends Mixins(
  ExpandGroupPropsMixin,
) {
  @Provide() accordion = {
    onChildChange: (child: any, state: any) => this.onChildChange(child, state),
  }

  onChildChange (child: any, state: any) {
    // No reaction when user closes collapse.
    if (state === false) {
      return
    }
    this.$children.forEach(expand => {
      if (expand === child) {
        return
      }
      console.log('test')
    })
  }
}
</script>

<style lang="scss">
.va-expand-group {
}
</style>
