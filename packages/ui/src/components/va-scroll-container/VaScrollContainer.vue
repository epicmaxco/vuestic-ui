<template>
  <div class="va-scroll-container">
    <div class="va-scroll-container__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { useColors, useSize, useSizeProps } from '../../composables'

export default defineComponent({
  name: 'VaScrollContainer',

  props: {
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
  },

  setup (props) {
    const { getColor } = useColors()
    const { sizeComputed } = useSize(props)

    return {
      overflowX: computed(() => props.horizontal ? 'auto' : 'hidden'),
      overflowY: computed(() => props.vertical ? 'auto' : 'hidden'),
      scrollColor: computed(() => {
        const color = getColor(props.color)
        return props.gradient ? `linear-gradient(0deg, var(--va-scroll-container-scrollbar-gradient-to) 0%, ${color} 100%)` : color
      }),
      scrollbarSize: computed(() => sizeComputed.value),
      scrollbarPosition: computed(() => props.rtl ? 'rtl' : 'ltr'),
    }
  },
})
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
