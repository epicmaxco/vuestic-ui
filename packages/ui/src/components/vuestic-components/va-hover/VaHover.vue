<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <slot :hover="valueComputed" />
  </div>
</template>

<script lang="ts">
import { Mixins, Prop } from 'vue-property-decorator'
import { Options } from 'vue-class-component'

import {
  StatefulMixin,
} from '../../vuestic-mixins/StatefulMixin/StatefulMixin'

@Options({
  name: 'VaHover',
})
export default class VaHover extends Mixins(StatefulMixin) {
  @Prop({
    type: Boolean,
    default: false,
  }) readonly disabled!: boolean

  @Prop({
    type: Boolean,
    default: false,
  }) modelValue!: boolean

  onMouseEnter () {
    if (!this.disabled) {
      this.valueComputed = true
    }
  }

  onMouseLeave () {
    if (!this.disabled) {
      this.valueComputed = false
    }
  }
}
</script>
