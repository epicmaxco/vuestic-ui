<template>
  <div
    class="va-card__title"
    :style="titleStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'

class CardTitleProps {
  textColor = prop<string>({ type: String, default: '' })
}

const CardTitlePropsMixin = Vue.with(CardTitleProps)

@Options({
  name: 'VaCardTitle',
})
export default class VaCardTitle extends mixins(
  ColorMixin,
  CardTitlePropsMixin,
) {
  get titleStyles () {
    return {
      color: this.textColor ? this.theme.getColor(this.textColor) : '',
    }
  }
}
</script>
