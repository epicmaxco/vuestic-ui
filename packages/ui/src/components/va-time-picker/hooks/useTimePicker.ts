import { computed, ComputedRef, Ref, ref } from 'vue'
import { useNumbersArray } from './useNumbersArray'

const numberWithZero = (n: number) => n < 10 ? `0${n}` : `${n}`

interface TimePickerColumn {
  items: ComputedRef<string[]> | Ref<string[]>,
  activeItemIndex: Ref<number>,
  animateScroll?: boolean,
  hideBottomCell?: boolean
}

const createNumbersColumn = (size: number, itemsOffset = 0): TimePickerColumn => {
  const items = useNumbersArray(size)
  const activeItemIndex = ref(0)

  return {
    items: computed(() => items.value
      .map((n) => numberWithZero(n + itemsOffset))),
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
}

export const useTimePicker = ({ period, view }: UseTimePickerOptions) => {
  const hours = createNumbersColumn(period ? 12 : 24, 1)
  const minutes = createNumbersColumn(60)
  const seconds = createNumbersColumn(60)

  const columns: Ref<TimePickerColumn[]> = ref([])

  if (view === 'hours') {
    columns.value.push(hours)
  } else if (view === 'minutes') {
    columns.value.push(hours, minutes)
  } else if (view === 'seconds') {
    columns.value.push(hours, minutes, seconds)
  }

  if (period) {
    columns.value.push(createPeriodColumn())
  }

  return {
    columns,
  }
}
