import { computed, ref, Ref, toRefs, watch } from 'vue'

interface TimePickerProps {
  ampm: boolean;
  hidePeriodSwitch: boolean;
  periodUpdatesModelValue: boolean;
  view: 'hours' | 'minutes' | 'seconds';
  modelValue?: Date;
  hoursFilter?: (h: number) => boolean,
  minutesFilter?: (h: number) => boolean
  secondsFilter?: (h: number) => boolean

  readonly?: boolean;
}

type ModelValueRef = Ref<Date | null | undefined>

// Use safeModelValue if we need to update model value
const safeModelValue = (m: ModelValueRef) => m.value ? m.value : new Date(new Date().setHours(0, 0, 0, 0))

const createNumbersArray = (length: number) => Array.from(Array(length).keys())

/**
 * Convert 00:00 -> 12:00 am, 00:01 -> 01:00 am.
 * So we need to changed 12 and 0 between two formats
 */
const from24to12 = (h: number) => (h === 0 ? 12 : h) - Number(h > 12) * 12
const from12to24 = (h: number, isAM = false) => (h === 12 ? 0 : h) + Number(isAM) * 12

const createHoursColumn = (props: TimePickerProps, modelValue: ModelValueRef, isPM: Ref<boolean>) => {
  const computedSize = computed(() => props.ampm ? 12 : 24)

  const items = computed(() => {
    let array = createNumbersArray(computedSize.value)

    if (props.hoursFilter) {
      array = array.filter((i) => props.hoursFilter!(props.ampm ? i + 12 * Number(isPM.value) : i))
    }

    return array.map((n) => {
      return props.ampm ? from24to12(n) : n
    })
  })

  const activeItem = computed({
    get: () => {
      if (!modelValue.value) { return -1 }

      if (props.ampm) {
        const h = from24to12(modelValue.value.getHours() - 12 * Number(isPM.value))
        return items.value.findIndex((i) => i === h)
      }

      const h = modelValue.value.getHours()

      return items.value.findIndex((i) => i === h)
    },
    set: (newIndex) => {
      if (props.readonly) { return }

      const hours = props.ampm ? from12to24(items.value[newIndex], isPM.value) : items.value[newIndex]

      modelValue.value = new Date(safeModelValue(modelValue).setHours(hours))
    },
  })

  return computed(() => ({
    items: items.value,
    activeItem: activeItem,
  }))
}

const createMinutesColumn = (props: TimePickerProps, modelValue: ModelValueRef) => {
  const items = computed(() => {
    const array = createNumbersArray(60)

    if (!props.minutesFilter) { return array }

    return array.filter(props.minutesFilter)
  })

  const activeItem = computed({
    get: () => {
      if (!modelValue.value) { return -1 }

      const m = modelValue.value.getMinutes()

      return items.value.findIndex((i) => i === m)
    },
    set: (newIndex) => {
      if (props.readonly) { return }

      const v = items.value[newIndex]

      modelValue.value = new Date(safeModelValue(modelValue).setMinutes(v))
    },
  })

  return computed(() => ({
    items: items.value,
    activeItem: activeItem,
  }))
}

const createSecondsColumn = (props: TimePickerProps, modelValue: ModelValueRef) => {
  const items = computed(() => {
    const array = createNumbersArray(60)

    if (!props.secondsFilter) { return array }

    return array.filter(props.secondsFilter)
  })

  const activeItem = computed({
    get: () => {
      if (!modelValue.value) { return -1 }

      const s = modelValue.value.getSeconds()

      return items.value.findIndex((i) => i === s)
    },
    set: (newIndex) => {
      if (props.readonly) { return }

      const v = items.value[newIndex]

      modelValue.value = new Date(safeModelValue(modelValue).setSeconds(v))
    },
  })

  return computed(() => ({
    items: items.value,
    activeItem: activeItem,
  }))
}

const createPeriodColumn = (props: TimePickerProps, modelValue: ModelValueRef, isPM: Ref<boolean>) => {
  return computed(() => ({
    items: ['AM', 'PM'],
    activeItem: computed({
      get: () => {
        if (!modelValue.value) { return -1 }
        return Number(isPM.value)
      },
      set: (val) => {
        isPM.value = Boolean(val)
        const h = safeModelValue(modelValue).getHours()
        let h24 = isPM.value ? h + 12 : h

        if (isPM.value && h <= 12) { h24 = h + 12 }
        if (!isPM.value && h >= 12) { h24 = h - 12 }

        // If there is no hoursFilter - it must be valid, otherwise validate hours
        const isValidFilteredHour = !props.hoursFilter || props.hoursFilter(h24)

        if (props.periodUpdatesModelValue && isValidFilteredHour) {
          modelValue.value = new Date(safeModelValue(modelValue).setHours(h24))
        }
      },
    }),
  }))
}

export const useTimePicker = (props: TimePickerProps, modelValue: ModelValueRef) => {
  const { view } = toRefs(props)

  const isPM = ref(false)
  watch(modelValue, () => { isPM.value = safeModelValue(modelValue).getHours() >= 12 }, { immediate: true })

  const hoursColumn = createHoursColumn(props, modelValue, isPM)
  const minutesColumn = createMinutesColumn(props, modelValue)
  const secondsColumn = createSecondsColumn(props, modelValue)
  const periodColumn = createPeriodColumn(props, modelValue, isPM)

  const columns = computed(() => {
    const array = []

    if (view.value === 'hours') {
      array.push(hoursColumn.value)
    } else if (view.value === 'minutes') {
      array.push(hoursColumn.value, minutesColumn.value)
    } else if (view.value === 'seconds') {
      array.push(hoursColumn.value, minutesColumn.value, secondsColumn.value)
    }
    if (props.ampm && !props.hidePeriodSwitch) {
      array.push(periodColumn.value)
    }

    return array
  })

  return {
    columns,
    isPM,
  }
}
