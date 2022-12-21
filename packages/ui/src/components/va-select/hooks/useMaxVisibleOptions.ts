import { computed, ref, toRef, watch, ExtractPropTypes } from 'vue'

import type { SelectOption } from '../types'

export const useMaxVisibleOptionsProps = {
  maxVisibleOptions: { type: Number, default: 0 },
}

type UseMaxVisibleOptionsProps = ExtractPropTypes<typeof useMaxVisibleOptionsProps> & { multiple: boolean, modelValue: SelectOption | SelectOption[] }

export const useMaxVisibleOptions = (
  props: UseMaxVisibleOptionsProps,
) => {
  const modelValue = toRef(props, 'modelValue')
  const isAllOptionsShown = ref(false)
  const belowLimitSelectedOptions = ref<SelectOption[]>([])
  const hiddenSelectedOptions = ref<SelectOption[]>([])

  const hiddenSelectedOptionsAmount = computed(() => hiddenSelectedOptions.value.length)
  const allSelectedOptions = computed(() => [...belowLimitSelectedOptions.value, ...hiddenSelectedOptions.value])
  const visibleSelectedOptions = computed(() => isAllOptionsShown.value ? allSelectedOptions.value : belowLimitSelectedOptions.value)

  watch(modelValue, () => {
    if (!props.multiple) { return }

    if (!Array.isArray(modelValue.value)) {
      belowLimitSelectedOptions.value = [modelValue.value]
      hiddenSelectedOptions.value = []
    }

    const value = modelValue.value as SelectOption[]

    if (props.maxVisibleOptions) {
      belowLimitSelectedOptions.value = value.slice(0, props.maxVisibleOptions)
      hiddenSelectedOptions.value = value.slice(props.maxVisibleOptions)
    } else {
      belowLimitSelectedOptions.value = [...value]
      hiddenSelectedOptions.value = []
    }
  })

  const toggleHiddenOptionsState = () => (isAllOptionsShown.value = !isAllOptionsShown.value)

  return {
    toggleHiddenOptionsState,
    isAllOptionsShown,
    visibleSelectedOptions,
    hiddenSelectedOptionsAmount,
    allSelectedOptions,
  }
}
