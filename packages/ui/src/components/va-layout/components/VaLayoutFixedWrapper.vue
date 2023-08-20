<template>
  <div
    class="va-layout-fixed-wrapper"
    :style="[{
      height: size ? size.height + 'px' : 'auto',
      width: size ? size.width + 'px' : 'auto',
    }]"
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
  AreaName,
} from '../hooks/useGridTemplateArea'
import { useFixedLayoutChild } from '../hooks/useLayout'

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

    const getPxOrZero = (value: number | null) => {
      if (!value) { return 0 + 'px' }

      return value + 'px'
    }

    const styles = computed(() => {
      if (direction.value === 'vertical') {
        return { width: `calc(100% - ${getPxOrZero(paddings.value.left)} - ${getPxOrZero(paddings.value.right)})`, [props.area]: 0 }
      } else {
        return { height: `calc(100% - ${getPxOrZero(paddings.value.top)} - ${getPxOrZero(paddings.value.bottom)})`, [props.area]: 0 }
      }
    })

    const { paddings } = useFixedLayoutChild(props.area, size)

    const computedStyle = computed(() => {
      return Object.keys(paddings.value).reduce((acc, key) => {
        if (key === props.area) { return acc }

        return {
          ...acc,
          [key]: `${paddings.value[key as AreaName]}px`,
        }
      }, {})
    })

    return {
      computedStyle,
      paddings,
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
    top: v-bind("styles.top");
    bottom: v-bind("styles.bottom");
    left: v-bind("styles.left");
    right: v-bind("styles.right");
  }
}
</style>
