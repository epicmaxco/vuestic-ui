<template>
  <div
    class="va-card__title"
    :style="titleStyles"
  >
    <slot />
  </div>
</template>

<script>
import { TextColorThemeMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'VaCardTitle',
  mixins: [TextColorThemeMixin],
  computed: {
    titleStyles () {
      return {
        color: this.textColorComputed,
      }
    },
  },
}
</script>
