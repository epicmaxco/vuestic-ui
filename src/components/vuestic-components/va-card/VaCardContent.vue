<template functional>
  <div
    class="va-card-new__content"
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
