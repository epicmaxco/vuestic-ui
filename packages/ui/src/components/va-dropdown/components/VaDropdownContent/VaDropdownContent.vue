<template>
  <div
    class="va-dropdown__content"
    :style="computedStyle"
    role="listbox"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, toRef } from 'vue'

import { useColors, useElementTextColor } from '../../../../composables'

defineOptions({
  name: 'VaDropdownContent',
})

const props = defineProps({
  noPadding: { type: Boolean, default: false },
  background: { type: String, default: 'background-secondary' },
  textColor: { type: String },
})

const { getColor } = useColors()
const textColorComputed = useElementTextColor(toRef(props, 'background'))

const computedStyle = computed(() => ({
  background: getColor(props.background, undefined, true),
  color: textColorComputed.value,
  padding: props.noPadding ? 0 : undefined,
}))
</script>

<style lang="scss">
@import "variables";

.va-dropdown {
  &__content {
    overflow-y: auto;
    padding: var(--va-dropdown-content-padding);
    box-shadow: var(--va-dropdown-content-box-shadow);
    border-radius: var(--va-dropdown-content-border-radius);
    font-family: var(--va-font-family);
  }
}
</style>
