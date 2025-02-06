<template>
  <div
    class="va-layout-fixed-wrapper"
    :style="[{
      height: size && direction === 'vertical' ? size.height + 'px' : 'auto',
      width: size && direction === 'horizontal' ? size.width + 'px' : 'auto',
    }]"
  >
    <VaResizeObserver
      class="va-layout-fixed-wrapper__content"
      :class="`va-layout-fixed-wrapper__content--${area}`"
      :style="!size ? { position: 'relative' } : styles"
      @resize="size = $event"
    >
      <slot />
    </VaResizeObserver>
  </div>
</template>

<script lang="ts" setup>
import VaResizeObserver from './VaResizeObserver.vue'
import { ref, type PropType, computed } from 'vue'
import {
  AreaName,
} from '../hooks/useGridTemplateArea'
import { useFixedLayoutChild } from '../hooks/useLayout'

defineOptions({
  name: 'VaLayoutFixedWrapper',
})

const props = defineProps({
  area: { type: String as PropType<AreaName>, required: true },
})

const size = ref<DOMRectReadOnly | null>(null)

const direction = computed(() => {
  if (props.area === 'top' || props.area === 'bottom') {
    return 'vertical'
  } else {
    return 'horizontal'
  }
})

const getPxOrZero = (value: number | null) => {
  if (!value) { return 0 + 'px' }

  return value + 'px'
}

const styles = computed(() => {
  if (direction.value === 'vertical') {
    return { width: `calc(100% - ${getPxOrZero(paddings.value.left)} - ${getPxOrZero(paddings.value.right)})` }
  } else {
    return { height: `calc(100% - ${getPxOrZero(paddings.value.top)} - ${getPxOrZero(paddings.value.bottom)})` }
  }
})

const { paddings } = useFixedLayoutChild(props.area, size)
</script>

<style lang="scss">
.va-layout-fixed-wrapper {
  position: relative;
  flex: 1;
  pointer-events: none;

  &__content {
    position: fixed;
    pointer-events: all;

    @media print {
      position: relative !important;
      height: max-content !important;
      width: max-content !important;
    }

    &--top {
      top: 0;
    }

    &--bottom {
      bottom: 0;
    }

    &--right {
      right: 0;
    }

    &--left {
      left: 0;
    }
  }
}
</style>
