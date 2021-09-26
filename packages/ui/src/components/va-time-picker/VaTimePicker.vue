<template>
  <div class="va-time-picker">
    <VaTimePickerColumn
      v-for="column in columns" :key="column"
      v-model:activeItemIndex="column.activeItemIndex"
      :items="column.items"
      :animate-scroll="column.animateScroll"
      :hide-bottom-cell="column.hideBottomCell"
      @item-selected="column.onItemSelected"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useTimePicker } from './hooks/useTimePicker'
import VaTimePickerColumn from './components/VaTimePickerColumn.vue'

export default defineComponent({
  components: { VaTimePickerColumn },

  props: {
    readonly: { type: Boolean, default: false },
    modelValue: { type: Date, required: false },
    period: { type: Boolean, default: true },
    view: { type: String as PropType<'hours' | 'minutes' | 'seconds'>, default: 'minutes' },
    hoursFilter: { type: Function as PropType<(h: number) => boolean> },
    minutesFilter: { type: Function as PropType<(h: number) => boolean> },
    secondsFilter: { type: Function as PropType<(h: number) => boolean> },
  },

  setup (props, { emit }) {
    const { columns } = useTimePicker(props, emit)

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
