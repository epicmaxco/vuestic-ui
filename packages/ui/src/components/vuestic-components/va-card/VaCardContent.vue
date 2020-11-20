<template>
  <div
    class="va-card__content"
    :style="contentStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'

@Component({
  name: 'VaCardContent',
})
export default class VaCardContent extends Mixins(
  ColorThemeMixin,
) {
  @Prop({ type: String, default: '' }) textColor!: string

  get contentStyles () {
    return {
      color: (this as any).getColor(this.textColor),
    }
  }
}
</script>
