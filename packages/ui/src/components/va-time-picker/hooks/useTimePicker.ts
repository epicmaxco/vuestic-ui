import { useSyncProp } from '../../../composables/useSyncProp'
import { computed, Ref, toRefs } from 'vue'

interface TimePickerProps {
  period: boolean;
  view: 'hours' | 'minutes' | 'seconds';
  modelValue?: Date;
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

const createHoursColumn = (props: TimePickerProps, modelValue: Ref<Date>) => {
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
        const h = from24to12(modelValue.value.getHours())
        return items.value.findIndex((i) => i === h)
      }

      const h = modelValue.value.getHours()

      return items.value.findIndex((i) => i === h)
    },
    set: (newIndex) => {
      if (props.period) {
        const v = from12to24(items.value[newIndex], modelValue.value.getHours() > 12)

        modelValue.value = new Date(modelValue.value.setHours(v))
      } else {
        const v = items.value[newIndex]

        modelValue.value = new Date(modelValue.value.setHours(v))
      }
    },
  })

  return computed(() => ({
    items: items.value,
    activeItem: activeItem,
  }))
}

const createMinutesColumn = (props: TimePickerProps, modelValue: Ref<Date>) => {
  const items = computed(() => {
    const array = createNumbersArray(60)

    if (!props.minutesFilter) { return array }

    return array.filter(props.minutesFilter)
  })

  const activeItem = computed({
    get: () => {
      const m = modelValue.value.getMinutes()

      return items.value.findIndex((i) => i === m)
    },
    set: (newIndex) => {
      const v = items.value[newIndex]

      modelValue.value = new Date(modelValue.value.setMinutes(v))
    },
  })

  return computed(() => ({
    items: items.value,
    activeItem: activeItem,
  }))
}

const createSecondsColumn = (props: TimePickerProps, modelValue: Ref<Date>) => {
  const items = computed(() => {
    const array = createNumbersArray(60)

    if (!props.secondsFilter) { return array }

    return array.filter(props.secondsFilter)
  })

  const activeItem = computed({
    get: () => {
      const s = modelValue.value.getSeconds()

      return items.value.findIndex((i) => i === s)
    },
    set: (newIndex) => {
      const v = items.value[newIndex]

      modelValue.value = new Date(modelValue.value.setSeconds(v))
    },
  })

  return computed(() => ({
    items: items.value,
    activeItem: activeItem,
  }))
}

const createPeriodColumn = (props: TimePickerProps, modelValue: Ref<Date>) => {
  return computed(() => ({
    items: ['AM', 'PM'],
    activeItem: computed({
      get: () => {
        return Number(modelValue.value.getHours() >= 12)
      },
      set: (val) => {
        const isPM = Boolean(val)
        const h = modelValue.value.getHours()

        if (isPM && h <= 12) {
          modelValue.value = new Date(modelValue.value.setHours(h + 12))
        } else if (!isPM && h >= 12) {
          modelValue.value = new Date(modelValue.value.setHours(h - 12))
        }
      },
    }),
  }))
}

export const useTimePicker = (props: TimePickerProps, emit: TimePickerEmit) => {
  const [modelValue] = useSyncProp('modelValue', props, emit, new Date())
  const { view } = toRefs(props)

  const hoursColumn = createHoursColumn(props, modelValue)
  const minutesColumn = createMinutesColumn(props, modelValue)
  const secondsColumn = createSecondsColumn(props, modelValue)
  const periodColumn = createPeriodColumn(props, modelValue)

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
