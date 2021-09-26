import { computed, toRefs } from 'vue'

interface TimePickerProps {
  period: boolean;
  view: 'hours' | 'minutes' | 'seconds';
  modelValue: Date;
  hoursFilter?: (h: number) => boolean,
  minutesFilter?: (h: number) => boolean
  secondsFilter?: (h: number) => boolean
}

type TimePickerEmit = (
  event: 'update:modelValue' | any,
...args: any[]
) => any

const createNumbersArray = (length: number) => Array
  .from(Array(length).keys())

const createHoursColumn = (props: TimePickerProps, emit: TimePickerEmit) => {
  const computedSize = computed(() => props.period ? 12 : 24)

  /**
   * Convert 00:00 -> 12:00 am, 00:01 -> 01:00 am.
   * So we need to changed 12 and 0 between two formats
   */
  const from24to12 = (h: number) => (h === 0 ? 12 : h) - Number(h > 12) * 12
  const from12to24 = (h: number, isAM = false) => (h === 12 ? 0 : h) + Number(isAM) * 12

  const items = computed(() => {
    const array = createNumbersArray(computedSize.value).map((n) => {
      return props.period ? from24to12(n) : n
    })

    if (!props.hoursFilter) { return array }

    return array.filter(props.hoursFilter)
  })

  const activeItem = computed({
    get: () => {
      if (props.period) {
        const h = from24to12(props.modelValue.getHours())
        return items.value.findIndex((i) => i === h)
      }

      const h = props.modelValue.getHours()

      return items.value.findIndex((i) => i === h)
    },
    set: (newIndex) => {
      if (props.period) {
        const v = from12to24(items.value[newIndex], props.modelValue.getHours() > 12)

        emit('update:modelValue', new Date(props.modelValue.setHours(v)))
      } else {
        const v = items.value[newIndex]

        emit('update:modelValue', new Date(props.modelValue.setHours(v)))
      }
    },
  })

  return computed(() => ({
    items: items.value,
    activeItem: activeItem,
  }))
}

const createMinutesColumn = (props: TimePickerProps, emit: TimePickerEmit) => {
  const items = computed(() => {
    const array = createNumbersArray(60)

    if (!props.minutesFilter) { return array }

    return array.filter(props.minutesFilter)
  })

  const activeItem = computed({
    get: () => {
      const m = props.modelValue.getMinutes()

      return items.value.findIndex((i) => i === m)
    },
    set: (newIndex) => {
      const v = items.value[newIndex]

      emit('update:modelValue', new Date(props.modelValue.setMinutes(v)))
    },
  })

  return computed(() => ({
    items: items.value,
    activeItem: activeItem,
  }))
}

const createSecondsColumn = (props: TimePickerProps, emit: TimePickerEmit) => {
  const items = computed(() => {
    const array = createNumbersArray(60)

    if (!props.secondsFilter) { return array }

    return array.filter(props.secondsFilter)
  })

  const activeItem = computed({
    get: () => {
      const s = props.modelValue.getSeconds()

      return items.value.findIndex((i) => i === s)
    },
    set: (newIndex) => {
      const v = items.value[newIndex]

      emit('update:modelValue', new Date(props.modelValue.setSeconds(v)))
    },
  })

  return computed(() => ({
    items: items.value,
    activeItem: activeItem,
  }))
}

const createPeriodColumn = (props: TimePickerProps, emit: TimePickerEmit) => {
  return computed(() => ({
    items: ['AM', 'PM'],
    activeItem: computed({
      get: () => {
        return Number(props.modelValue.getHours() >= 12)
      },
      set: (val) => {
        const isPM = Boolean(val)
        const h = props.modelValue.getHours()

        if (isPM && h <= 12) {
          return emit('update:modelValue', new Date(props.modelValue.setHours(h + 12)))
        }

        if (!isPM && h >= 12) {
          emit('update:modelValue', new Date(props.modelValue.setHours(h - 12)))
        }
      },
    }),
  }))
}

export const useTimePicker = (props: TimePickerProps, emit: TimePickerEmit) => {
  const { view } = toRefs(props)

  const hoursColumn = createHoursColumn(props, emit)
  const minutesColumn = createMinutesColumn(props, emit)
  const secondsColumn = createSecondsColumn(props, emit)
  const periodColumn = createPeriodColumn(props, emit)

  const columns = computed(() => {
    const array = []

    if (view.value === 'hours') {
      array.push(hoursColumn.value)
    } else if (view.value === 'minutes') {
      array.push(hoursColumn.value, minutesColumn.value)
    } else if (view.value === 'seconds') {
      array.push(hoursColumn.value, minutesColumn.value, secondsColumn.value)
    }
    if (props.period) {
      array.push(periodColumn.value)
    }

    return array
  })

  return {
    columns,
  }
}
