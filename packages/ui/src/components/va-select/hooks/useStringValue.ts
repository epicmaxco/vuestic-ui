import { computed, type Ref, type ExtractPropTypes } from 'vue'

import type { SelectOption } from '../types'

export const useStringValueProps = {
  separator: { type: String, default: ', ' },
}

type UseStringValueProps = ExtractPropTypes<typeof useStringValueProps>

export const useStringValue = (
  props: UseStringValueProps,
  visibleSelectedOptions: Ref<SelectOption[]>,
  getText: (option: SelectOption) => string,
) => {
  return computed<string>(() => {
    if (!visibleSelectedOptions.value?.length) {
      return ''
    }

    return visibleSelectedOptions.value.map(getText).join(props.separator) ?? ''
  })
}
