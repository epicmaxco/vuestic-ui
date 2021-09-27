<template>
  <div class="va-time-picker">
    <VaTimePickerColumn
      v-for="(column, idx) in columns" :key="idx"
      v-model:activeItemIndex="column.activeItem.value"
      :items="column.items"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useTimePicker } from './hooks/useTimePicker'
import VaTimePickerColumn from './components/VaTimePickerColumn.vue'
import { useStateful, statefulComponentOptions } from '../../mixins/StatefulMixin/cStatefulMixin'

export default defineComponent({
  components: { VaTimePickerColumn },

  props: {
    ...statefulComponentOptions.props,
    readonly: { type: Boolean, default: false },
    modelValue: { type: Date, default: undefined },
    period: { type: Boolean, default: true },
    hidePeriodSwitch: { type: Boolean, default: false },
    view: { type: String as PropType<'hours' | 'minutes' | 'seconds'>, default: 'minutes' },
    hoursFilter: { type: Function as PropType<(h: number) => boolean> },
    minutesFilter: { type: Function as PropType<(h: number) => boolean> },
    secondsFilter: { type: Function as PropType<(h: number) => boolean> },
  },

  emits: [...statefulComponentOptions.emits],

  setup (props, { emit, expose }) {
    const { valueComputed } = useStateful(props, emit, new Date())
    const { columns } = useTimePicker(props, valueComputed)

    const changePeriod = (isPM: boolean) => {
      const h = valueComputed.value.getHours()

      if (isPM && h <= 12) {
        valueComputed.value = new Date(valueComputed.value.setHours(h + 12))
      } else if (!isPM && h >= 12) {
        valueComputed.value = new Date(valueComputed.value.setHours(h - 12))
      }
    }

    const changePeriodToPm = () => changePeriod(true)
    const changePeriodToAm = () => changePeriod(false)

    expose({ changePeriodToPm, changePeriodToAm })

    return {
      columns,
    }
  },
})
</script>

<style lang="scss" scoped>
  @import '../../styles/resources/resources';

  .va-time-picker {
    display: inline-flex;
    justify-content: center;
    overflow: hidden;
    height: 200px;
  }
</style>
