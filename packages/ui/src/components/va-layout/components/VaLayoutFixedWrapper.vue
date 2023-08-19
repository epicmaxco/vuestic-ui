<template>
  <div
    class="va-layout-fixed-wrapper"
    :style="{
      height: size ? size.height + 'px' : 'auto',
      width: size ? size.width + 'px' : 'auto',
    }"
  >
    <VaResizeObserver
      class="va-layout-fixed-wrapper__content"
      @resize="size = $event"
    >
      <slot />
    </VaResizeObserver>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, type PropType, computed } from 'vue'
import VaResizeObserver from './VaResizeObserver.vue'
import {
  useGridTemplateArea,
  AreaName,
} from '../hooks/useGridTemplateArea'

export default defineComponent({
  name: 'VaLayoutFixedWrapper',

  components: { VaResizeObserver },

  props: {
    area: { type: String as PropType<AreaName>, required: true },
  },

  setup (props) {
    const size = ref<DOMRectReadOnly | null>(null)

    const direction = computed(() => {
      if (props.area === 'top' || props.area === 'bottom') {
        return 'vertical'
      } else {
        return 'horizontal'
      }
    })

    const styles = computed(() => {
      if (direction.value === 'vertical') {
        return { width: '100%' }
      } else {
        return { height: '100%' }
      }
    })

    return {
      size,
      styles,
    }
  },
})
</script>

<style lang="scss">
.va-layout-fixed-wrapper {
  position: relative;
  flex: 1;

  &__content {
    position: fixed;
    width: v-bind("styles.width");
    height: v-bind("styles.height");
  }
}
</style>
