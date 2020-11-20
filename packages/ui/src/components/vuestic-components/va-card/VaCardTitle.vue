<template>
  <div
    class="va-card__title"
    :style="titleStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'

@Component({
  name: 'VaCardTitle',
})
export default class VaCardTitle extends Mixins(
  ColorThemeMixin,
) {
  @Prop({ type: String, default: '' }) textColor!: string

  get titleStyles () {
    return {
      color: (this as any).getColor(this.textColor),
    }
  }
}
</script>
