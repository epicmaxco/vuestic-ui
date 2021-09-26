import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { dateToTime } from '../utils/dateToTime'
import { useNumbersArray } from './useNumbersArray'

const numberWithZero = (n: number) => n < 10 ? `0${n}` : `${n}`

interface TimePickerColumn {
  items: ComputedRef<string[]> | Ref<string[]>,
  activeItemIndex: Ref<number>,
  animateScroll?: boolean,
  hideBottomCell?: boolean
}

const createNumbersColumn = (size: number, itemsOffset = 0, filterFn?: (n: number, index: number, array: number[]) => boolean): TimePickerColumn => {
  const items = useNumbersArray(size)
  const activeItemIndex = ref(0)

  return {
    items: computed(() => {
      let newItems = items.value

      if (filterFn) { newItems = newItems.filter((n, idx) => filterFn(n + itemsOffset, idx, newItems)) }

      return newItems.map((n) => numberWithZero(n + itemsOffset))
    }),
    activeItemIndex,
    animateScroll: true,
  }
}

const createPeriodColumn = (): TimePickerColumn => {
  const items = ref(['AM', 'PM'])
  const activeItemIndex = ref(0)

  return {
    items,
    activeItemIndex,
    // We can disabled scroll and hide button cell
    animateScroll: true,
    // hideBottomCell: true,
  }
}

interface UseTimePickerOptions {
  period?: boolean;
  view?: 'hours' | 'minutes' | 'seconds';
  modelValue?: Date;
  hoursFilter?: (h: number) => boolean,
  minutesFilter?: (h: number) => boolean
  secondsFilter?: (h: number) => boolean
}

export const useTimePicker = ({
  period, view, modelValue,
  hoursFilter, minutesFilter, secondsFilter,
}: UseTimePickerOptions) => {
  const hours = createNumbersColumn(period ? 12 : 24, 1, hoursFilter)
  const minutes = createNumbersColumn(60, 0, minutesFilter)
  const seconds = createNumbersColumn(60, 0, secondsFilter)
  const periodColumn = createPeriodColumn()

  const columns: Ref<TimePickerColumn[]> = ref([])

  if (view === 'hours') {
    columns.value.push(hours)
  } else if (view === 'minutes') {
    columns.value.push(hours, minutes)
  } else if (view === 'seconds') {
    columns.value.push(hours, minutes, seconds)
  }

  if (period) {
    columns.value.push(periodColumn)
  }

  watch(() => modelValue, (newVal) => {
    if (!newVal) { return }

    const { h, m, s } = dateToTime(newVal)
    hours.activeItemIndex.value = period ? (h % 12) - 1 : h - 1
    minutes.activeItemIndex.value = m
    seconds.activeItemIndex.value = s

    periodColumn.activeItemIndex.value = Number(h > 12) // 0 if less 12, 1 if bigger than 12
  }, { immediate: true })

  return {
    columns,
  }
}
