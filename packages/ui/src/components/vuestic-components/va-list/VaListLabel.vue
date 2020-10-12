<template>
  <div
    class="va-list-label"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

@Component({
  name: 'VaListLabel',
})
export default class VaListLabel extends Mixins(
  ColorThemeMixin,
) {
  get computedStyle () {
    return {
      color: this.colorComputed,
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-list-label {
  @include va-title();

  text-align: center;
  padding: 0.3rem 0;
}
</style>
