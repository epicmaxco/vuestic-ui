<template>
  <div class="va-expand-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Provide, Prop } from 'vue-property-decorator'

import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'

export const ExpandGroupService = Symbol('ExpandGroupService')

@Component({
  name: 'VaExpandGroup',
})
export default class VaExpandGroup extends Mixins(
  StatefulMixin,
) {
  @Provide(ExpandGroupService) accordion = {
    getProps: () => this.getProps(),
    getState: () => this.getState(),
    onChildChange: (child: any, state: any) => this.onChildChange(child, state),
  }

  @Prop({ type: Array, default: () => [] }) value!: boolean[]
  @Prop({ type: Boolean, default: false }) multiply!: boolean
  @Prop({ type: Boolean, default: false }) inset!: boolean
  @Prop({ type: Boolean, default: false }) popout!: boolean

  getProps () {
    return {
      inset: this.inset,
      popout: this.popout,
    }
  }

  getState () {
    return this.valueComputed
  }

  onChildChange (index: number, value: boolean) {
    this.valueComputed = (this.valueComputed as boolean[]).map((v, i) => {
      if (i === index) {
        return value
      }

      if (!this.multiply) {
        return false
      }

      return v
    })
  }
}
</script>

<style lang="scss">
.va-expand-group {
}
</style>
