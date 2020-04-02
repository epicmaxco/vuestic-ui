<template>
  <div
    class="va-card__content"
    :style="contentStyles"
  >
    <slot />
  </div>
</template>

<script>
import { TextColorThemeMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'VaCardContent',
  mixins: [TextColorThemeMixin],
  computed: {
    contentStyles () {
      return {
        color: this.textColorComputed,
      }
    },
  },
}
</script>
