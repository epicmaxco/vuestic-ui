<template>
  <div class="va-date-picker-header va-date-picker__header">
    <va-icon name="chevron_left" size="small" @click="$emit('prev')" />
    <div class="header-text">
      <slot name="header-text" v-bind="{ year, month, monthNames, view }">
        <span class="mr-1">
          <slot name="year" v-bind="{ year }">{{ year }}</slot>
        </span>

        <slot v-if="view !== 'year'" name="month" v-bind="{ month }">{{ monthNames[month] }}</slot>
      </slot>
    </div>
    <va-icon name="chevron_right" size="small" @click="$emit('next')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VaDatePickerHeaderProps } from './VaDatePickerHeaderProps'

export default defineComponent({
  name: 'VaDatePickerHeader',

  emits: ['next', 'prev'],

  props: VaDatePickerHeaderProps,

  setup () {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.va-date-picker {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-text {
      color: var(--va-dark);
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
    }
  }
}
</style>
