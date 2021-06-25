<template>
  <div class="va-date-picker-header va-date-picker__header">
    <va-icon name="chevron_left" size="small" @click="prev" />
    <div class="header-text">
      <slot name="header-text" v-bind="{ year, month, monthNames, view, changeView, switchView }">
        <va-button flat @click="switchView" size="small">
          <span class="mr-1">
            <slot name="year" v-bind="{ year }">{{ year }}</slot>
          </span>

          <slot v-if="view !== 'year'" name="month" v-bind="{ month }">{{ monthNames[month] }}</slot>
        </va-button>
      </slot>
    </div>
    <va-icon name="chevron_right" size="small" @click="next" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from 'vue'
import { useSyncProp } from '../../hooks/StatefulProp'
import { VaDatePickerView } from '../../types/types'

export default defineComponent({
  name: 'VaDatePickerHeader',

  emits: ['update:year', 'update:month', 'update:view'],

  props: {
    // Use default here to make year and month not undefined type
    year: { type: Number, required: true, default: () => 0 },
    month: { type: Number, required: true, default: () => 0 },
    monthNames: { type: Array, required: true },
    view: { type: String as PropType<VaDatePickerView>, required: true },
  },

  setup (props, { emit }) {
    const { year, month, view } = toRefs(props)
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
      if (syncView.value === 'year') {
        syncView.value = 'month'
      } else {
        syncView.value = 'year'
      }
    }

    const changeView = (view: VaDatePickerView) => {
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
