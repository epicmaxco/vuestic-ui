import { computed, type Ref, type ExtractPropTypes } from 'vue'

import type { SelectOption } from '../types'

export const useStringValueProps = {
  separator: { type: String, default: ', ' },
}

type UseStringValueProps = ExtractPropTypes<typeof useStringValueProps> & { clearValue: string }

export const useStringValue = (
  props: UseStringValueProps,
  visibleSelectedOptions: Ref<SelectOption[]>,
  getText: (option: SelectOption) => string,
) => {
  return computed<string>(() => {
    if (!visibleSelectedOptions.value?.length) {
      return props.clearValue
    }

    return visibleSelectedOptions.value.map((value) =>
      getText(value)).join(props.separator) || props.clearValue
  })
}
