<template>
  <div class="va-card__content" :style="contentStyles">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { useColors } from '../../composables/useColor'

export default defineComponent({
  name: 'VaCardContent',
  props: {
    textColor: { type: String as PropType<string> },
  },
  setup (props) {
    const { getColor } = useColors()

    return {
      contentStyles: computed(() => ({
        color: props.textColor ? getColor(props.textColor) : '',
      })),
    }
  },
})

</script>
