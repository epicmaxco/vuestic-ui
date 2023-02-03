import { computed, type Ref, type ExtractPropTypes } from 'vue'

import type { SelectOption } from '../types'

export const useStringValueProps = {
  separator: { type: String, default: ', ' },
}

type UseStringValueProps = ExtractPropTypes<typeof useStringValueProps> & { clearValue: string }

export const useStringValue = (
  props: UseStringValueProps,
  valueComputed: Ref<SelectOption | SelectOption[]>,
  visibleSelectedOptions: Ref<SelectOption[]>,
  getText: (option: SelectOption) => string,
) => {
  return computed<string>(() => {
    if (!valueComputed.value && valueComputed.value !== 0) {
      return props.clearValue
    }

    if (['string', 'number'].includes(typeof valueComputed.value)) {
      return String(valueComputed.value)
    }

    if (Array.isArray(valueComputed.value)) {
      return visibleSelectedOptions.value.map((value) =>
        getText(value)).join(props.separator) || props.clearValue
    }

    return getText(valueComputed.value)
  })
}
