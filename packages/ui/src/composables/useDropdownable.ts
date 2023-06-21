import { watch, ExtractPropTypes, Ref, computed, unref } from 'vue'
import { useSyncProp } from './useSyncProp'
import { extractComponentProps, filterComponentProps } from '../utils/component-options'
import { VaDropdown } from '../components/va-dropdown'

const VaDropdownProps = extractComponentProps(VaDropdown,
  ['innerAnchorSelector', 'stateful', 'keyboardNavigation', 'modelValue', 'ariaLabel'],
)

export const useDropdownableProps = {
  ...VaDropdownProps,
  modelValue: {},
  /**
   * Close dropdown on value updated.
   * @default null - behavior controlled by component
   */
  closeOnValueUpdate: { type: Boolean, default: null },
  isOpen: { type: Boolean, default: undefined },
}

export const useDropdownableEmits = ['update:isOpen']

/** Used in components where dropdown is used */
export const useDropdownable = function (
  props: ExtractPropTypes<typeof useDropdownableProps>,
  emit: (event: 'update:isOpen', ...args: any[]) => void,
  options: {
    /** @default false */
    defaultCloseOnValueUpdate?: boolean | Ref<boolean>
  } = {},
) {
  const [isOpenSync] = useSyncProp('isOpen', props, emit, false)

  const doWatch = computed(() => props.closeOnValueUpdate !== null ? props.closeOnValueUpdate : unref(options.defaultCloseOnValueUpdate || false))

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
