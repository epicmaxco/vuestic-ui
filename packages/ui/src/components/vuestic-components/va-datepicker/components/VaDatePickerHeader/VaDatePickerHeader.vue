<template>
  <div class="va-date-picker-header va-date-picker__header">
    <slot name="button:prev" v-bind="{ onClick: prev }">
      <va-icon name="chevron_left" size="small" @click="prev" />
    </slot>

    <div class="va-date-picker-header__text">
      <slot name="header" v-bind="{ year, month, monthNames, view, changeView, switchView }">
        <va-button flat @click="switchView" size="small">
          <span class="mr-1">
            <slot name="year" v-bind="{ year }">{{ year }}</slot>
          </span>

          <slot v-if="view !== 'year'" name="month" v-bind="{ month }">{{ monthNames[month] }}</slot>
        </va-button>
      </slot>
    </div>

    <slot name="button:next" v-bind="{ onClick: next }">
      <va-icon name="chevron_right" size="small" @click="next" />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from 'vue'
import { useSyncProp } from '../../hooks/sync-prop'
import { VaDatePickerView } from '../../types/types'

export default defineComponent({
  name: 'VaDatePickerHeader',

  emits: ['update:year', 'update:month', 'update:view'],

  props: {
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    monthNames: { type: Array, required: true },
    view: { type: String as PropType<VaDatePickerView>, required: true },
    canSwitchView: { type: Boolean, required: true },
  },

  setup (props, { emit }) {
    const { year, month, view, canSwitchView } = toRefs(props)
    const { syncProp: syncYear } = useSyncProp(year, 'year', emit, new Date().getFullYear())
    const { syncProp: syncMonth } = useSyncProp(month, 'month', emit, new Date().getMonth())
    const { syncProp: syncView } = useSyncProp(view, 'view', emit)

    const next = () => {
      if (view?.value === 'month') {
        // If current month is December
        if (syncMonth.value === 11) {
          syncYear.value = syncYear.value + 1
          syncMonth.value = 0
        } else {
          syncMonth.value = syncMonth.value + 1
        }
      } else if (view?.value === 'year') {
        syncYear.value = syncYear.value + 1
      }
    }

    const prev = () => {
      if (view?.value === 'month') {
      // If current month is December
        if (syncMonth.value === 0) {
          syncYear.value = syncYear.value - 1
          syncMonth.value = 11 // set current month is December
        } else {
          syncMonth.value = syncMonth.value - 1
        }
      } else if (view?.value === 'year') {
        syncYear.value = syncYear.value - 1
      }
    }

    // Temp solution for two views
    const switchView = () => {
      if (!canSwitchView.value) { return }

      if (syncView.value === 'year') {
        syncView.value = 'month'
      } else {
        syncView.value = 'year'
      }
    }

    const changeView = (view: VaDatePickerView) => {
      if (!canSwitchView.value) { return }

      syncView.value = view
    }

    return { prev, next, changeView, switchView }
  },
})
</script>

<style lang="scss" scoped>
.va-date-picker {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__text {
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
