<template>
  <div
    v-if="syncView.type !== 'year'"
    class="va-date-picker-header va-date-picker__header"
  >
    <slot name="buttonPrev" v-bind="{ onClick: prev }">
      <va-button
        :disabled="$props.disabled"
        icon="chevron_left"
        flat
        size="small"
        :color="color"
        textColor="dark"
        aria-label="next period"
        @click="prev"
      />
    </slot>

    <div class="va-date-picker__header__text">
      <slot name="header" v-bind="{ year: syncView.year, month: syncView.month, monthNames, view: syncView, changeView, switchView }">
        <va-button
          :disabled="$props.disabled"
          flat
          size="small"
          :rounded="false"
          :color="color"
          textColor="dark"
          aria-label="switch view"
          @click="switchView"
        >
          <slot name="year" v-bind="{ year: syncView.year }">{{ syncView.year }}</slot>

          <slot v-if="syncView.type === 'day'" name="month" v-bind="{ month: syncView.month }">
            <span class="ml-1">{{ monthNames[syncView.month] }}</span>
          </slot>
        </va-button>
      </slot>
    </div>

    <slot name="buttonNext" v-bind="{ onClick: next }">
      <va-button
        :disabled="$props.disabled"
        icon="chevron_right"
        flat
        size="small"
        :color="color"
        textColor="dark"
        aria-label="previous period"
        @click="next"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useView } from '../../hooks/view'

import { DatePickerView } from '../../types'

import { VaButton } from '../../../va-button'

export default defineComponent({
  name: 'VaDatePickerHeader',
  components: { VaButton },
  emits: ['update:view'],
  props: {
    monthNames: { type: Array, required: true },
    view: { type: Object as PropType<DatePickerView> },
    color: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },

  setup (props, { emit }) {
    const { syncView, prev, next } = useView(props, emit)

    const switchView = () => {
      if (syncView.value.type === 'day') {
        syncView.value = { ...syncView.value, type: 'month' }
      } else if (syncView.value.type === 'month') {
        syncView.value = { ...syncView.value, type: 'year' }
      }
    }

    const changeView = (view: DatePickerView) => {
      syncView.value = view
    }

    return { prev, next, changeView, switchView, syncView }
  },
})
</script>

<style lang="scss">
.va-date-picker {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__text {
      color: var(--va-dark);
    }
  }
}
</style>
