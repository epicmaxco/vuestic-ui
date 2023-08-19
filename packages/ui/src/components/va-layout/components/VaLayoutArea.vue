<template>
  <VaLayoutAbsoluteWrapper v-if="absolute" :area="area">
    <div :class="`va-layout__area va-layout__area--${area}`">
      <VaLayoutFixedWrapper v-if="fixed" :area="area" :order="config.order || 0">
        <slot />
      </VaLayoutFixedWrapper>
      <slot v-else />
    </div>
  </VaLayoutAbsoluteWrapper>

  <div v-else :class="`va-layout__area va-layout__area--${area}`">
    <VaLayoutFixedWrapper v-if="fixed" :area="area" :order="config.order || 0">
      <slot />
    </VaLayoutFixedWrapper>
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue'
import { AreaName } from '../hooks/useGridTemplateArea'
import { AreaConfig } from '../hooks/useLayout'
import VaLayoutAbsoluteWrapper from './VaLayoutAbsoluteWrapper.vue'
import VaLayoutFixedWrapper from './VaLayoutFixedWrapper.vue'

// Area is a simple div with a grid-area property
// If area is absolute, it should be wrapped in a absolute wrapper
// If area is fixed, it should be wrapped in a fixed wrapper
// If area is fixed and absolute, it should be wrapped in absolute wrapper and then in fixed wrapper
export default defineComponent({
  name: 'VaLayoutArea',

  components: {
    VaLayoutAbsoluteWrapper,
    VaLayoutFixedWrapper,
  },

  props: {
    area: { type: String as PropType<AreaName>, required: true },
    config: { type: Object as PropType<AreaConfig>, required: true },
  },

  setup (props) {
    return {
      absolute: computed(() => props.config.absolute || false),
      fixed: computed(() => props.config.fixed || false),
      // Content z-index is always 0, other areas must have bigger z-index by 1
      zIndex: computed(() => (props.config.order || 0) + 1),
    }
  },
})
</script>

<style lang="scss">
  .va-layout {
    &__area {
      grid-area: v-bind("$props.area");
      z-index: v-bind("zIndex");
    }
  }
</style>
