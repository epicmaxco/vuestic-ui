<template>
  <div
    class="va-list-label"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useColors } from '../../composables/useColor'

export default defineComponent({
  name: 'VaListLabel',
  props: {
    color: { type: String, default: 'primary' },
  },
  setup: (props) => {
    const { getColor } = useColors()

    return {
      computedStyle: computed(() => ({
        color: getColor(props.color),
      })),
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-list-label {
  font-family: var(--va-font-family);

  @include va-title();

  text-align: var(--va-list-label-text-align);
  padding: var(--va-list-label-padding);
}
</style>
