<template>
  <div
    class="va-list-separator"
    :class="computedClass"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

export default defineComponent({
  name: 'VaListSeparator',
  props: {
    fit: { type: Boolean as PropType<boolean>, default: false },
    spaced: { type: Boolean as PropType<boolean>, default: false },
  },
  setup: (props) => ({
    computedClass: computed(() => ({
      'va-list-separator--offset': !props.fit,
      'va-list-separator--spaced': props.spaced,
    })),
  }),
})
</script>

<style lang="scss">
@import "../../styles/resources";

.va-list-separator {
  height: 1px;
  background-color: $separator-color;

  &--offset {
    margin-left: 1.5rem;
  }

  &--spaced {
    margin: 1.5rem 0;
  }
}
</style>
