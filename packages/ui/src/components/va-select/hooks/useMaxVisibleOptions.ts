import { computed, ref, toRef, watch, type ExtractPropTypes } from 'vue'

import { isNilValue } from '../../../utils/isNilValue'

import type { SelectOption } from '../types'

export const useMaxVisibleOptionsProps = {
  maxVisibleOptions: { type: Number, default: 0 },
}

type UseMaxVisibleOptionsProps = ExtractPropTypes<typeof useMaxVisibleOptionsProps> & { multiple: boolean, modelValue: SelectOption | SelectOption[] }

export const useMaxVisibleOptions = (
  props: UseMaxVisibleOptionsProps,
  getOptionByValue: (v: SelectOption) => SelectOption,
) => {
  const modelValue = toRef(props, 'modelValue')
  const isAllOptionsShown = ref(false)
  const belowLimitSelectedOptions = ref<SelectOption[]>([])
  const hiddenSelectedOptions = ref<SelectOption[]>([])

  const hiddenSelectedOptionsAmount = computed(() => hiddenSelectedOptions.value.length)
  const allSelectedOptions = computed(() => [...belowLimitSelectedOptions.value, ...hiddenSelectedOptions.value])
  const visibleSelectedOptions = computed(() => {
    if (!props.maxVisibleOptions || isAllOptionsShown.value) { return allSelectedOptions.value }

    return belowLimitSelectedOptions.value
  })

  watch(modelValue, () => {
    if (!Array.isArray(modelValue.value)) {
      belowLimitSelectedOptions.value = [getOptionByValue(modelValue.value)]
      hiddenSelectedOptions.value = []
      return
    }

    const value = modelValue.value.filter((v) => !isNilValue(v)).map(getOptionByValue)

    if (props.maxVisibleOptions) {
      belowLimitSelectedOptions.value = value.slice(0, props.maxVisibleOptions)
      hiddenSelectedOptions.value = value.slice(props.maxVisibleOptions)
    } else {
      belowLimitSelectedOptions.value = [...value]
      hiddenSelectedOptions.value = []
    }
  }, { immediate: true })

  const toggleHiddenOptionsState = () => (isAllOptionsShown.value = !isAllOptionsShown.value)

  return {
    toggleHiddenOptionsState,
    isAllOptionsShown,
    visibleSelectedOptions,
    hiddenSelectedOptionsAmount,
    allSelectedOptions,
  }
}
