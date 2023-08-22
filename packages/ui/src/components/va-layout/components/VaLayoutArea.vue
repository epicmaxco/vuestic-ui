<template>
  <VaLayoutAbsoluteWrapper v-if="absolute">
    <div :class="`va-layout-area va-layout__area va-layout__area--${area}`">
      <VaLayoutFixedWrapper v-if="fixed" :area="area">
        <slot />
      </VaLayoutFixedWrapper>
      <slot v-else />
    </div>
  </VaLayoutAbsoluteWrapper>

  <div v-else :class="`va-layout-area va-layout__area va-layout__area--${area}`">
    <VaLayoutFixedWrapper v-if="fixed" :area="area">
      <slot />
    </VaLayoutFixedWrapper>
    <slot v-else />
  </div>

  <Transition>
    <div class="va-layout-area__overlay" v-if="overlay" @click="$emit('overlay-click')" />
  </Transition>
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

  emits: ['overlay-click'],

  setup (props) {
    return {
      absolute: computed(() => props.config.absolute || false),
      fixed: computed(() => props.config.fixed || false),
      overlay: computed(() => props.config.overlay || false),
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

  &__absolute-area-wrapper {
    z-index: v-bind("zIndex");
  }
}

.va-layout-area {
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--va-layout-overlay-color);
    z-index: v-bind("zIndex - 1");

    &.v-enter-active,
    &.v-leave-active {
      transition: opacity 0.5s ease;
    }

    &.v-enter-from,
    &.v-leave-to {
      opacity: 0;
    }
  }
}
</style>
