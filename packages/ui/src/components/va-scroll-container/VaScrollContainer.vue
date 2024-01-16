<template>
  <div class="va-scroll-container">
    <div class="va-scroll-container__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'

import { useColors, useSize, useSizeProps } from '../../composables'

defineOptions({
  name: 'VaScrollContainer',
})

const props = defineProps({
  ...useSizeProps,
  vertical: { type: Boolean, default: false },
  horizontal: { type: Boolean, default: false },
  color: { type: String, default: 'secondary' },
  rtl: { type: Boolean, default: false },
  gradient: { type: Boolean, default: false },
  sizesConfig: {
    type: Object,
    default: () => ({
      defaultSize: 4,
      sizes: { small: 4, medium: 6, large: 8 },
    }),
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'small',
    validator: (v: string) => ['small', 'medium', 'large'].includes(v),
  },
})

const { getColor } = useColors()
const { sizeComputed } = useSize(props)

const overflowX = computed(() => props.horizontal ? 'auto' : 'hidden')
const overflowY = computed(() => props.vertical ? 'auto' : 'hidden')

const scrollColor = computed(() => {
  const color = getColor(props.color)
  return props.gradient ? `linear-gradient(0deg, var(--va-scroll-container-scrollbar-gradient-to) 0%, ${color} 100%)` : color
})

const scrollbarSize = computed(() => sizeComputed.value)
const scrollbarPosition = computed(() => props.rtl ? 'rtl' : 'ltr')
</script>

<style lang="scss">
@import '../../styles/resources';
@import './variables';

.va-scroll-container {
  @include va-scroll(v-bind(scrollColor), v-bind(scrollbarSize));

  overflow-x: v-bind(overflowX);
  overflow-y: v-bind(overflowY);
  width: 100%;
  height: 100%;
  direction: v-bind(scrollbarPosition);

  &__content {
    height: stretch;
    width: stretch;
    direction: ltr;
  }
}
</style>
