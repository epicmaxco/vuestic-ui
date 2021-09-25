<template>
  <div class="va-time-picker">
    <VaTimePickerColumn
      v-model:activeItemIndex="focusedHour"
      :items="hoursCount"
      animate-scroll
    />

    <VaTimePickerColumn
      v-model:activeItemIndex="focusedMinute"
      :items="minutesCount"
      animate-scroll
    />

    <VaTimePickerColumn
      v-model:activeItemIndex="focusedMinute"
      :items="['AM', 'PM']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useNumbersArray } from './hooks/useNumbersArray'
import VaTimePickerColumn from './components/VaTimePickerColumn.vue'

export default defineComponent({
  components: { VaTimePickerColumn },

  props: {
    readonly: { type: Boolean, default: false },
    modelValue: { type: Date },
  },

  setup () {
    const [hoursCount] = useNumbersArray(12)
    const [minutesCount] = useNumbersArray(60)
    const showAmPm = ref(false)

    const focusedHour = ref(0)
    const focusedMinute = ref(0)

    const numberWithZero = (n: number) => n < 10 ? `0${n}` : n

    return {
      hoursCount,
      minutesCount,
      showAmPm,
      focusedHour,
      focusedMinute,

      numberWithZero,

      log: () => console.log('AA'),
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
