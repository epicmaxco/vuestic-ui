<template>
  <VaLayoutAbsoluteWrapper v-if="absolute">
    <VaLayoutFixedWrapper v-if="fixed" :area="area" :class="layoutAreaClass">
      <slot />
    </VaLayoutFixedWrapper>
    <div v-else :class="layoutAreaClass">
      <slot />
    </div>
  </VaLayoutAbsoluteWrapper>

  <VaLayoutFixedWrapper v-else-if="fixed" :area="area" :class="layoutAreaClass">
    <slot />
  </VaLayoutFixedWrapper>
  <div v-else :class="layoutAreaClass">
    <slot />
  </div>

  <Transition>
    <div
      v-if="overlay"
      class="va-layout-area__overlay"
      :class="{ 'va-layout-area__overlay--fixed': fixed }"
      @click="$emit('overlay-click')"
    />
  </Transition>
</template>

<script lang="ts" setup>
import VaLayoutAbsoluteWrapper from './VaLayoutAbsoluteWrapper.vue'
import VaLayoutFixedWrapper from './VaLayoutFixedWrapper.vue'
import { PropType, computed } from 'vue'
import { AreaName } from '../hooks/useGridTemplateArea'
import { AreaConfig } from '../hooks/useLayout'

defineOptions({
  name: 'VaLayoutArea',
})

const props = defineProps({
  area: { type: String as PropType<AreaName>, required: true },
  config: { type: Object as PropType<AreaConfig>, required: true },
})

const emit = defineEmits(['overlay-click'])

const absolute = computed(() => props.config.absolute || false)
const fixed = computed(() => props.config.fixed || false)
const overlay = computed(() => props.config.overlay || false)
const zIndex = computed(() => (props.config.order || 0) + 1)
const layoutAreaClass = computed(() => `va-layout-area va-layout__area va-layout__area--${props.area}`)
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

    &--fixed {
      position: fixed;
    }
  }
}
</style>
