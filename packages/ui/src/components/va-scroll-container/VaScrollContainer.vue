<template>
  <div class="va-scroll-container" v-bind="variablesComputed">
    <div class="va-scroll-container__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'

import { useColors, useSizeProps } from '../../composables'
import { useComponentVariables } from '../../composables/useComponentVariables'
import { Sizes, Variables } from './const'

defineOptions({
  name: 'VaScrollContainer',
})

const props = defineProps({
  ...useSizeProps<Variables, Sizes>('small'),
  vertical: { type: Boolean, default: false },
  horizontal: { type: Boolean, default: false },
  color: { type: String, default: 'secondary' },
  rtl: { type: Boolean, default: false },
  gradient: { type: Boolean, default: false },
})

const { getColor } = useColors()

const overflowX = computed(() => props.horizontal ? 'auto' : 'hidden')
const overflowY = computed(() => props.vertical ? 'auto' : 'hidden')

const scrollColor = computed(() => {
  const color = getColor(props.color)
  return props.gradient ? `linear-gradient(0deg, var(--va-scroll-container-scrollbar-gradient-to) 0%, ${color} 100%)` : color
})

const scrollbarPosition = computed(() => props.rtl ? 'rtl' : 'ltr')

const variablesComputed = useComponentVariables(props)
</script>

<style lang="scss">
@import '../../styles/resources';
@import './variables';

.va-scroll-container {
  @include va-scroll(v-bind(scrollColor), var(--va-scroll-container-scrollbar-size));

  overflow-x: v-bind(overflowX);
  overflow-y: v-bind(overflowY);
  width: 100%;
  height: 100%;
  direction: v-bind(scrollbarPosition);

  &--small {
    --va-scroll-container-scrollbar-size: 4px;
  }

  &--large {
    --va-scroll-container-scrollbar-size: 8px;
  }

  &__content {
    height: stretch;
    width: stretch;
    direction: ltr;
  }
}
</style>
