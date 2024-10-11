<template>
  <div
    aria-hidden="true"
    class="va-list-separator"
    :class="computedClass"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useComponentPresetProp } from '../../composables'

defineOptions({
  name: 'VaListSeparator',
})

const props = defineProps({
  ...useComponentPresetProp,
  fit: { type: Boolean, default: false },
  spaced: { type: Boolean, default: false },
})

const computedClass = computed(() => ({
  'va-list-separator--offset': !props.fit,
  'va-list-separator--spaced': props.spaced,
}))
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
