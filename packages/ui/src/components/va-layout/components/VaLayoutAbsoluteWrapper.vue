<template>
  <div class="va-layout__absolute-area-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { AreaName } from '../hooks/useGridTemplateArea'

export default defineComponent({
  name: 'VaLayoutAbsoluteWrapper',

  props: {
    area: { type: String as PropType<AreaName>, required: true },
  },
})
</script>

<style lang="scss">
  .va-layout {
    // Wrapper is responsible for positioning correctly absolute areas
    &__absolute-area-wrapper {
      .va-layout__area {
        position: absolute;

        &--top {
          width: 100%;
        }

        &--bottom {
          width: 100%;
        }

        &--right {
          right: 0;
          height: 100%;
        }

        &--left {
          left: 0;
          height: 100%;
        }
      }
    }
  }
</style>
