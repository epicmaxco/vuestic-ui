import { watch, ExtractPropTypes } from 'vue'
import { useSyncProp } from './useSyncProp'
import { extractComponentProps, filterComponentProps } from '../utils/component-options'
import { VaDropdown } from '../components/va-dropdown'

const VaDropdownProps = extractComponentProps(VaDropdown,
  ['innerAnchorSelector', 'stateful', 'keyboardNavigation', 'modelValue', 'ariaLabel'],
)

export const useDropdownableProps = {
  ...VaDropdownProps,
  modelValue: {},
  closeOnValueUpdate: { type: Boolean, default: false },
  isOpen: { type: Boolean, default: undefined },
}

export const useDropdownableEmits = ['update:isOpen']

/** Used in components where dropdown is used */
export const useDropdownable = function (
  props: ExtractPropTypes<typeof useDropdownableProps>,
  emit: (event: 'update:isOpen', ...args: any[]) => void,
) {
  const [isOpenSync] = useSyncProp('isOpen', props, emit, false)

  watch(() => props.modelValue, () => {
    if (props.closeOnValueUpdate) {
      isOpenSync.value = false
    }
  })

  return {
    dropdownProps: filterComponentProps(VaDropdownProps),
    isOpenSync,
  }
}
