<template>
  <div
    class="va-list-label"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { useComponentPresetProp, useColors, ColorName } from '../../composables'
import { StringWithAutocomplete } from '../../utils/types/prop-type'

defineOptions({
  name: 'VaListLabel',
})

const props = defineProps({
  ...useComponentPresetProp,
  color: { type: String as PropType<StringWithAutocomplete<ColorName>>, default: 'primary' },
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
