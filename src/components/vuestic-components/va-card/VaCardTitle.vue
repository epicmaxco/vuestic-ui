<template functional>
  <div
    class="va-card-new__title"
    :style="titleStyles"
  >
    <slot />
  </div>
</template>

<script>
import { FontColorTextMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'VaCardTitle',
  mixins: [FontColorTextMixin],
  computed: {
    titleStyles () {
      return this.computedColor
    },
  },
}
</script>
