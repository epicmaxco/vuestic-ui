<template>
  <div class="va-scroll-container">
    <div class="va-scroll-container__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useColors } from '../../composables'

export default defineComponent({
  name: 'VaScrollContainer',

  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'secondary',
    },
    /** Proxy for scrollbar-width css property. Can be changed in global config. */
    size: {
      type: String as PropType<'default' | 'thin' | 'none'>,
      default: 'thin',
    },
  },

  setup (props) {
    const { getColor } = useColors()

    return {
      overflowX: computed(() => props.horizontal ? 'auto' : 'hidden'),
      overflowY: computed(() => props.vertical ? 'auto' : 'hidden'),
      scrollColor: computed(() => getColor(props.color)),
      scrollbarWidth: computed(() => props.size === 'default' ? 'auto' : props.size),
    }
  },
})
</script>

<style lang="scss">
  @import '../../styles/resources';

  .va-scroll-container {
    @include va-scroll(v-bind(scrollColor));

    overflow-x: v-bind(overflowX);
    overflow-y: v-bind(overflowY);
    width: 100%;
    height: 100%;
    scrollbar-width: v-bind(scrollbarWidth);

    &__content {
      height: max-content;
      width: max-content;
    }
  }
</style>
