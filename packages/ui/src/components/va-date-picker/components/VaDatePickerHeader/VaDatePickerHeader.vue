<template>
  <div
    v-if="syncView.type !== 'year'"
    class="va-date-picker-header va-date-picker__header"
  >
    <slot name="buttonPrev" v-bind="{ onClick: prev }">
      <va-button
        va-child="prevButton"
        :disabled="$props.disabled"
        icon="va-arrow-left"
        preset="plain"
        size="small"
        :color="color"
        :textColor="currentColor"
        :aria-label="tp($props.ariaPreviousPeriodLabel)"
        round
        @click="prev"
      />
    </slot>

    <div class="va-date-picker__header__text">
      <slot name="header" v-bind="{ year: syncView.year, month: syncView.month, monthNames, view: syncView, changeView, switchView }">
        <va-button
          va-child="middleButton"
          :disabled="$props.disabled"
          preset="plain"
          size="small"
          :color="color"
          :textColor="currentColor"
          :aria-label="tp($props.ariaSwitchViewLabel)"
          @click="switchView"
        >
          <slot name="year" v-bind="{ year: syncView.year }">{{ syncView.year }}</slot>

          <slot v-if="syncView.type === 'day'" name="month" v-bind="{ month: syncView.month }">
            <span class="va-date-picker__header__month">{{ monthNames[syncView.month] }}</span>
          </slot>
        </va-button>
      </slot>
    </div>

    <slot name="buttonNext" v-bind="{ onClick: next }">
      <va-button
        va-child="nextButton"
        :disabled="$props.disabled"
        icon="va-arrow-right"
        preset="plain"
        size="small"
        :color="color"
        :textColor="currentColor"
        :aria-label="tp($props.ariaNextPeriodLabel)"
        @click="next"
        round
      />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

import { useView } from '../../hooks/view'

import { DatePickerView } from '../../types'

import { VaButton } from '../../../va-button'
import { useCurrentElement, useElementTextColor, useElementBackground, useTranslation, useTranslationProp } from '../../../../composables'

defineOptions({
  name: 'VaDatePickerHeader',
})

const props = defineProps({
  monthNames: { type: Array, required: true },
  view: { type: Object as PropType<DatePickerView> },
  color: { type: String },
  disabled: { type: Boolean, default: false },

  ariaNextPeriodLabel: useTranslationProp('$t:nextPeriod'),
  ariaPreviousPeriodLabel: useTranslationProp('$t:previousPeriod'),
  ariaSwitchViewLabel: useTranslationProp('$t:switchView'),
})

const emit = defineEmits(['update:view'])

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

const currentColor = useElementTextColor(useElementBackground(useCurrentElement()))

const { tp } = useTranslation()
</script>

<style lang="scss">
.va-date-picker {
  color: currentColor;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__text {
      color: currentColor;
    }

    &__month {
      margin-left: 0.25rem;
    }
  }
}
</style>
