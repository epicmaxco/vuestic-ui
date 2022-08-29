<template>
  <div class="va-scroll-container">
    <div class="va-scroll-container__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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
  },

  setup (props) {
    const { getColor } = useColors()

    return {
      overflowX: computed(() => props.horizontal ? 'auto' : 'hidden'),
      overflowY: computed(() => props.vertical ? 'auto' : 'hidden'),
      scrollColor: computed(() => getColor(props.color)),
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

    &__content {
      height: max-content;
      width: max-content;
    }
  }
</style>
