import { ref, watch, type Ref, type ExtractPropTypes, onMounted } from 'vue'

import type { SelectOption } from '../types'

export const useAutocompleteProps = {
  autocomplete: { type: Boolean, default: false },
}

type UseAutocompleteProps = ExtractPropTypes<typeof useAutocompleteProps> & { multiple: boolean }

export const useAutocomplete = (
  autocompleteValue: Ref<string>,
  props: UseAutocompleteProps,
  value: Ref<SelectOption[]>,
  dropdownShown: Ref<boolean>,
  getText: (option: SelectOption) => string,
) => {
  const getLastOptionText = (v: SelectOption[]) => v?.length ? getText(v.at(-1)!) : ''

  if (props.autocomplete && !props.multiple) {
    // Set current value as autocomplete value text
    autocompleteValue.value = getLastOptionText(value.value)
  }

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
    if (!props.autocomplete) { return }

    if (newValue && newValue !== getLastOptionText(value.value)) {
      dropdownShown.value = true
    }
  })

  const onDropdownClosed = () => {
    autocompleteValue.value = props.multiple ? '' : getLastOptionText(value.value)
  }

  watch(dropdownShown, (newValue, oldValue) => {
    if (!props.autocomplete) { return }

    if (!newValue || oldValue) { onDropdownClosed() }
  })

  return autocompleteValue
}
