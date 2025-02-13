<template>
  <div
    class="va-hover"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot v-bind="{ hover: valueComputed }" />
  </div>
</template>

<script lang="ts" setup>
import { useComponentPresetProp, useStateful, createStatefulProps, useStatefulEmits } from '../../composables'

defineOptions({
  name: 'VaHover',
})

const props = defineProps({
  ...createStatefulProps(true),
  ...useComponentPresetProp,
  disabled: { type: Boolean, default: false },
  modelValue: { type: Boolean, default: false },
})

const emit = defineEmits([...useStatefulEmits])

const valueComputed = useStateful(props, emit)

const onMouseEnter = () => {
  if (!props.disabled) { valueComputed.value = true }
}

const onMouseLeave = () => {
  if (!props.disabled) { valueComputed.value = false }
}
</script>
