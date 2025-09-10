<template>
  <a
    class="va-skip-link"
    role="link"
    :href="target"
    :style="position"
  >
    <slot />
</a>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { usePosition } from './hooks/usePosition'

export default defineComponent({
  name: 'VaSkipLink',
  props: {
    target: { type: String, default: undefined },
    position: {
      type: String as PropType<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>,
      default: 'bottom-right',
      validator: (v: string) => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(v),
    },
  },

  setup (props) {
    const { position } = usePosition(props)

    return { position }
  },
})
</script>

<style lang="scss">
.va-skip-link {
  display: flex;
  position: fixed;
  opacity: 0;
  pointer-events: none;

  &:focus {
    opacity: 1;
    pointer-events: inherit;
  }
}
</style>