<template>
  <div
    class="va-list"
    role="list"
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useComponentPresetProp } from '../../composables/useComponentPreset'

export default defineComponent({
  name: 'VaList',
  props: {
    ...useComponentPresetProp,
    fit: { type: Boolean, default: false },
  },

  setup: (props) => ({
    computedClass: computed(() => ({ 'va-list--fit': props.fit })),
  }),
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-list {
  padding: var(--va-list-padding);
  width: var(--va-list-width);
  font-family: var(--va-font-family);

  &--fit {
    width: fit-content;
  }
}
</style>
