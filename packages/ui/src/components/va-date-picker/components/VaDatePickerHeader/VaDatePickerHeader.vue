<template>
  <div class="va-date-picker-header va-date-picker__header" v-if="syncView.type !== 'year'">
    <slot name="buttonPrev" v-bind="{ onClick: prev }">
      <va-button icon="chevron_left" flat size="small" :color="color" textColor="dark" @click="prev" />
    </slot>

    <div class="va-date-picker__header__text">
      <slot name="header" v-bind="{ year: syncView.year, month: syncView.month, monthNames, view: syncView, changeView, switchView }">
        <va-button flat @click="switchView" size="small" :rounded="false" :color="color" textColor="dark">
          <slot name="year" v-bind="{ year: syncView.year }">{{ syncView.year }}</slot>

          <slot v-if="syncView.type === 'day'" name="month" v-bind="{ month: syncView.month }">
            <span class="ml-1">{{ monthNames[syncView.month] }}</span>
          </slot>
        </va-button>
      </slot>
    </div>

    <slot name="buttonNext" v-bind="{ onClick: next }">
      <va-button icon="chevron_right" flat size="small" :color="color" textColor="dark" @click="next" />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { VaDatePickerView } from '../../types/types'
import { useView } from '../../hooks/view'
import VaButton from '../../../va-button'

export default defineComponent({
  name: 'VaDatePickerHeader',

  components: { VaButton },

  emits: ['update:view'],

  props: {
    monthNames: { type: Array, required: true },
    view: { type: Object as PropType<VaDatePickerView> },
    color: { type: String, default: undefined },
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

    const changeView = (view: VaDatePickerView) => {
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
