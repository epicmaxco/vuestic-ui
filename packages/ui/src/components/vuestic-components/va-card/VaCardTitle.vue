<template>
  <div
    class="va-card__title"
    :style="titleStyles"
  >
    <slot />
  </div>
</template>

<script>
import { getColor } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaCardTitle',
  mixins: [makeContextablePropsMixin({
    textColor: {
      type: String,
    },
  })],
  computed: {
    titleStyles () {
      return {
        color: getColor(this, this.c_textColor),
      }
    },
  },
}
</script>
