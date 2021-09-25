<template>
  <div class="va-time-picker">
    <VaTimePickerColumn
      v-for="column in columns" :key="column"
      v-model:activeItemIndex="column.activeItemIndex"
      :items="column.items"
      :animate-scroll="column.animateScroll"
      :hide-bottom-cell="column.hideBottomCell"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue'
import { useTimePicker } from './hooks/useTimePicker'
import VaTimePickerColumn from './components/VaTimePickerColumn.vue'

export default defineComponent({
  components: { VaTimePickerColumn },

  props: {
    readonly: { type: Boolean, default: false },
    modelValue: { type: Date },
    period: { type: Boolean, default: true },
    view: { type: String as PropType<'hours' | 'minutes' | 'seconds'>, default: 'minutes' },
  },

  setup (props) {
    const { columns } = useTimePicker(props)

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
