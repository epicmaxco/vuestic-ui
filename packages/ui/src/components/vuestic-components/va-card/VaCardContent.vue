<template>
  <div
    class="va-card__content"
    :style="contentStyles"
  >
    <slot />
  </div>
</template>

<script>
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { getColor } from '../../../services/ColorThemePlugin'

export default {
  name: 'VaCardContent',
  mixins: [makeContextablePropsMixin({
    textColor: {
      type: String,
    },
  })],
  computed: {
    contentStyles () {
      return {
        color: getColor(this, this.c_textColor),
      }
    },
  },
}
</script>
