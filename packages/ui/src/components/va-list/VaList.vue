<template>
  <div
    class="va-list"
    :class="{ 'va-list--fit': $props.fit }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VaList',
  props: {
    fit: { type: Boolean as PropType<boolean>, default: false },
  },
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
