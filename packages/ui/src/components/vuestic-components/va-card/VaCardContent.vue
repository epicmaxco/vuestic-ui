<template>
  <div
    class="va-card__content"
    :style="contentStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'

class CardContentProps {
  textColor = prop<string>({ type: String, default: '' })
}

const CardContentPropsMixin = Vue.with(CardContentProps)

@Options({
  name: 'VaCardContent',
})
export default class VaCardContent extends mixins(
  ColorMixin,
  CardContentPropsMixin,
) {
  get contentStyles () {
    return {
      color: this.textColor ? this.theme.getColor(this.textColor) : '',
    }
  }
}
</script>
