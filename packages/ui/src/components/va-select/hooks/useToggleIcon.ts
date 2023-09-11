import { Ref, computed, PropType, ExtractPropTypes } from 'vue'

import { useColors } from '../../../composables'

import type { SelectDropdownIcon } from '../types'

export const useToggleIconProps = {
  dropdownIcon: {
    type: [String, Object] as PropType<string | SelectDropdownIcon>,
    default: (): SelectDropdownIcon => ({
      open: 'va-arrow-down',
      close: 'va-arrow-up',
    }),
    validator: (value: string | SelectDropdownIcon) => {
      if (typeof value === 'string') { return true }

      return Object.entries(value)
        .every(([prop, propValue]) => ['open', 'close'].includes(prop) && typeof propValue === 'string')
    },
  },
}

export const useToggleIcon = (
  props: ExtractPropTypes<typeof useToggleIconProps> & { readonly: boolean, color: string },
  showDropdownContent: Ref<boolean>,
) => {
  const toggleIcon = computed(() => {
    if (!props.dropdownIcon) { return '' }

    if (typeof props.dropdownIcon === 'string') {
      return props.dropdownIcon
    }

    return showDropdownContent.value ? props.dropdownIcon.close : props.dropdownIcon.open
  })

  const { getHoverColor, getColor } = useColors()
  const colorComputed = computed(() => getColor('secondary'))
  const toggleIconColor = computed(() => props.readonly ? getHoverColor(colorComputed.value) : colorComputed.value)

  return { toggleIcon, toggleIconColor }
}
