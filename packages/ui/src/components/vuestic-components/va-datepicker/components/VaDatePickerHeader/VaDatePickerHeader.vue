<template>
  <div class="va-date-picker-header va-date-picker__header">
    <slot name="button:prev" v-bind="{ onClick: prev }">
      <va-icon name="chevron_left" size="small" @click="prev" />
    </slot>

    <div class="va-date-picker-header__text">
      <slot name="header" v-bind="{ year: view.year, month: view.month, monthNames, view, changeView, switchView }">
        <va-button flat @click="switchView" size="small">
          <span class="mr-1">
            <slot name="year" v-bind="{ year: view.year }">{{ view.year }}</slot>
          </span>

          <slot v-if="view !== 'year'" name="month" v-bind="{ month: view.month }">{{ monthNames[view.month] }}</slot>
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
import { DatePickerView } from '../../helpers/date-picker-view'
import { useSyncProp } from '../../hooks/sync-prop'

export default defineComponent({
  name: 'VaDatePickerHeader',

  emits: ['update:year', 'update:month', 'update:view'],

  props: {
    monthNames: { type: Array, required: true },
    view: { type: Object as PropType<DatePickerView>, required: true },
    canSwitchView: { type: Boolean, required: true },
  },

  setup (props, { emit }) {
    const { view, canSwitchView } = toRefs(props)
    const { syncProp: syncView } = useSyncProp(view, 'view', emit)

    const next = () => {
      syncView.value.next()
    }

    const prev = () => {
      syncView.value.prev()
    }

    const switchView = () => {
      if (!canSwitchView.value) { return }

      syncView.value.switchView()
    }

    const changeView = (view: DatePickerView) => {
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
