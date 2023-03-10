import type { ExtractPropTypes, PropType } from 'vue'

import { getValueByKey } from '../utils/value-by-key'

export type SelectableOption = string | number | boolean | Record<string, any>
export type StringOrFunction = string | ((option: SelectableOption) => unknown)

export const useSelectableListProps = {
  options: { type: Array as PropType<SelectableOption[]>, default: () => [] },
  textBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'text' },
  valueBy: { type: [String, Function] as PropType<StringOrFunction>, default: '' },
  trackBy: { type: [String, Function] as PropType<StringOrFunction>, default: '' },
  disabledBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'disabled' },
  groupBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'group' },
}

export function useSelectableList (props: ExtractPropTypes<typeof useSelectableListProps>) {
  const getOptionProperty = (option: SelectableOption, prop: StringOrFunction) => {
    // if option is a primitive value, we return itself
    if (typeof option !== 'object') { return option }

    return getValueByKey(option, prop)
  }

  const getTrackBy = (option: SelectableOption): string | number => {
    return props.trackBy ? getOptionProperty(option, props.trackBy) : getValue(option)
  }

  const getDisabled = (option: SelectableOption): boolean => {
    // any non-object options should return `false`
    if (typeof option !== 'object') { return false }

    return getOptionProperty(option, props.disabledBy)
  }

  const getText = (option: SelectableOption): string => {
    const optionText = getOptionProperty(option, props.textBy)

    // `String` should prevent wrong type errors in case of number/boolean value
    if (['number', 'boolean'].includes(typeof optionText)) { return String(optionText) }

    return optionText
  }

  // group by is used as object's key, so it can be only string or number
  const getGroupBy = (option: SelectableOption): string | number | undefined => {
    if (!option || typeof option !== 'object') { return undefined }

    return getOptionProperty(option, props.groupBy)
  }

  // value can be any type except array
  const getValue = (option: SelectableOption) => getOptionProperty(option, props.valueBy)

  return {
    getValue,
    getText,
    getDisabled,
    getTrackBy,
    getGroupBy,
  }
}
