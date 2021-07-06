<template>
  <div class="va-year-picker">
    2021
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { VaDatePickerMode, VaDatePickerModelValue } from '../../types/types'

export default defineComponent({
  props: {
    modelValue: { type: [Date, Array, Object] as PropType<VaDatePickerModelValue> },
    allowedYears: { type: Function as PropType<(date: Date) => boolean>, default: undefined },
    hightlightToday: { type: Boolean, default: true },
    mode: { type: String as PropType<VaDatePickerMode>, default: 'auto' },
  },
  setup () {
    return {}
  },
})
</script>

<style lang="scss">
.va-year-picker {
  display: flex;
  justify-content: center;
}
</style>
