import { watch, ExtractPropTypes, Ref, computed, unref } from 'vue'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'
import { VaDropdown } from '../../components/va-dropdown'
import { useVModelStateful } from '../std/internal/useVModelStateful'

const VaDropdownProps = extractComponentProps(VaDropdown,
  ['innerAnchorSelector', 'stateful', 'keyboardNavigation', 'modelValue'],
)

export const useDropdownableControlProps = {
  ...VaDropdownProps,
  modelValue: {},
  /**
   * Close dropdown on value updated.
   * @default null - behavior controlled by component
   */
  closeOnChange: { type: Boolean, default: null },
  isOpen: { type: Boolean, default: false },
}

export const useDropdownableControlEmits = ['update:isOpen']

/** Used in components where dropdown is used */
export const useDropdownableControl = function (
  props: ExtractPropTypes<typeof useDropdownableControlProps>,
  emit: (event: 'update:isOpen', ...args: any[]) => void,
  options: {
    /** @default false */
    defaultCloseOnValueUpdate?: boolean | Ref<boolean>
  } = {},
) {
  const isOpenSync = useVModelStateful(props, 'isOpen', emit)

  const doWatch = computed(() => props.closeOnChange !== null ? props.closeOnChange : unref(options.defaultCloseOnValueUpdate || false))

  watch(() => props.modelValue, () => {
    if (doWatch.value) {
      isOpenSync.value = false
    }
  })

  return {
    dropdownProps: filterComponentProps(VaDropdownProps),
    isOpenSync,
  }
}
