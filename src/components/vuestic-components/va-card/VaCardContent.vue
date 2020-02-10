<template functional>
  <div
    class="va-card-new__content"
    :style="contentStyles"
  >
    <slot />
  </div>
</template>

<script>
import { FontColorTextMixin } from '../../../services/ColorThemePlugin'

export default {
  name: 'VaCardContent',
  mixins: [FontColorTextMixin],
  computed: {
    contentStyles () {
      return this.computedColor
    },
  },
}
</script>
