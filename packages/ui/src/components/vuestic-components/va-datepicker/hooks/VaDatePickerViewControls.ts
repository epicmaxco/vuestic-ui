import { VaDatePickerView } from './../types/types'
import { toRefs, ref, computed, Ref, UnwrapRef } from 'vue'

function useStatefulProp<T, PropName extends string> (propRef: Ref<T | undefined> | undefined, propName: PropName, emit: (event: any, newValue: T) => any, defaultValue: T) {
  const statefulValue = ref<T>(defaultValue)

  const computedValue = computed<T>({
    set (value: T) {
      statefulValue.value = value as UnwrapRef<T>
      emit(`update:${propName}`, value)
    },
    get (): T {
      return propRef?.value === undefined ? (statefulValue.value as T) : propRef.value
    },
  })

  return {
    statefulProp: computedValue,
  }
}

export const useVaDatePickerViewControls = (props: { year?: number; month?: number, view?: VaDatePickerView}, emit: (event: 'update:year' | 'update:month', ...args: any[]) => void) => {
  const { year, month, view } = toRefs(props)
  const { statefulProp: statefulYear } = useStatefulProp(year, 'year', emit, new Date().getFullYear())
  const { statefulProp: statefulMonth } = useStatefulProp(month, 'month', emit, new Date().getMonth())

  const nextMonth = () => {
    if (view?.value === 'month') {
      // If current month is December
      if (statefulMonth.value === 11) {
        statefulYear.value = statefulYear.value + 1
        statefulMonth.value = 0
      } else {
        statefulMonth.value = statefulMonth.value + 1
      }
    } else if (view?.value === 'year') {
      statefulYear.value = statefulYear.value + 1
    }
  }
  const prevMonth = () => {
    if (view?.value === 'month') {
      // If current month is December
      if (statefulMonth.value === 0) {
        statefulYear.value = statefulYear.value - 1
        statefulMonth.value = 11 // set current month is December
      } else {
        statefulMonth.value = statefulMonth.value - 1
      }
    } else if (view?.value === 'year') {
      statefulYear.value = statefulYear.value - 1
    }
  }

  return {
    statefulYear,
    statefulMonth,
    nextMonth,
    prevMonth,
  }
}
