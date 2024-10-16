<template>
  <div
    class="va-list-label"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useComponentPresetProp, useColors } from '../../composables'

defineOptions({
  name: 'VaListLabel',
})

const props = defineProps({
  ...useComponentPresetProp,
  color: { type: String, default: 'primary' },
})

const { getColor } = useColors()

const computedStyle = computed(() => ({
  color: getColor(props.color),
}))
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
