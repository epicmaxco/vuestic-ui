<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <slot :hover="valueComputed" />
  </div>
</template>

<script lang="ts">
import { Options, prop, mixins, Vue } from 'vue-class-component'

import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'

class HoverProps {
  disabled = prop<boolean>({
    type: Boolean,
    default: false,
  })

  modelValue = prop<boolean>({
    type: Boolean,
    default: false,
  })
}

const HoverPropsMixin = Vue.with(HoverProps)

@Options({
  name: 'VaHover',
})
export default class VaHover extends mixins(StatefulMixin, HoverPropsMixin) {
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
