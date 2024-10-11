<template>
  <div
    class="va-list"
    role="list"
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useComponentPresetProp } from '../../composables'

defineOptions({
  name: 'VaList',
})

const props = defineProps({
  ...useComponentPresetProp,
  fit: { type: Boolean, default: false },
})

const computedClass = computed(() => ({ 'va-list--fit': props.fit }))
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-list {
  width: var(--va-list-width);
  font-family: var(--va-font-family);

  &--fit {
    width: fit-content;
  }
}
</style>
