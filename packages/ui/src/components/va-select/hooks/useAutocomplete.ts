import { ref, watch, type Ref, type ExtractPropTypes } from 'vue'

import type { SelectOption } from '../types'

export const useAutocompleteProps = {
  autocomplete: { type: Boolean, default: false },
}

type UseAutocompleteProps = ExtractPropTypes<typeof useAutocompleteProps> & { multiple: boolean }

export const useAutocomplete = (
  props: UseAutocompleteProps,
  value: Ref<SelectOption[]>,
  valueString: Ref<string>,
  dropdownShown: Ref<boolean>,
  getText: (option: SelectOption) => string,
) => {
  const getLastOptionText = (v: SelectOption[] | string | undefined) => {
    if (!v) { return '' }

    if (typeof v === 'string') { return v }

    return Array.isArray(v) && v.length ? getText(v.at(-1)!) : ''
  }

  const autocompleteValue = ref('')

  watch(value, (newValue, oldValue) => {
    if (!props.autocomplete) { return }

    const newValueStringConverted = getLastOptionText(newValue)
    const oldValueStringConverted = getLastOptionText(oldValue)

    if (newValueStringConverted !== oldValueStringConverted) {
      autocompleteValue.value = props.multiple ? '' : newValueStringConverted
      if (!props.multiple) {
        dropdownShown.value = false
      }
    }
  })

  watch(autocompleteValue, (newValue) => {
    if (newValue && newValue !== getLastOptionText(value.value)) {
      dropdownShown.value = true
    }
  })

  watch(dropdownShown, (newValue, oldValue) => {
    if (!props.autocomplete || newValue || !oldValue) { return }

    autocompleteValue.value = props.multiple ? '' : String(valueString.value)
  })

  const setAutocompleteValue = (v: string) => (autocompleteValue.value = v)

  return { autocompleteValue, setAutocompleteValue }
}
