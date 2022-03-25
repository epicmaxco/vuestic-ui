<template>
  <div
    class="va-list-label"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { useColors } from '../../composables/useColor'

export default defineComponent({
  name: 'VaListLabel',
  props: {
    color: { type: String as PropType<string>, default: 'primary' },
  },
  setup: (props) => ({
    computedStyle: computed(() => ({
      color: useColors().getColor(props.color),
    })),
  }),
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
