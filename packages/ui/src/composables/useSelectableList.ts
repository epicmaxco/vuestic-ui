import { PropType, ExtractPropTypes } from 'vue'

import { getValueByKey } from '../utils/value-by-key'

export type SelectableOption = string | number | Record<string, any>

type StringOrFunction = string | ((option: SelectableOption) => unknown)

export const useSelectableListProps = {
  options: { type: Array as PropType<SelectableOption[]>, default: () => [] },
  textBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'text' },
  valueBy: { type: [String, Function] as PropType<StringOrFunction>, default: '' },
  trackBy: { type: [String, Function] as PropType<StringOrFunction>, default: '' },
  disabledBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'disabled' },
  groupBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'group' },
}

export function useSelectableList (props: ExtractPropTypes<typeof useSelectableListProps>) {
  const isStringOrNumber = (option: SelectableOption): option is (string | number) => {
    const typeOfOption = typeof option
    return typeOfOption === 'string' || typeOfOption === 'number'
  }

  const getOptionProperty = (option: SelectableOption, selector: StringOrFunction) => {
    return !selector || isStringOrNumber(option)
      ? option
      : getValueByKey(option, selector)
  }

  const getValue = (option: SelectableOption) => getOptionProperty(option, props.valueBy)

  const getOptionByValue = (value: SelectableOption) => {
    if (!props.valueBy) { return value }
    return props.options.find((option: SelectableOption) => value === getValue(option)) || value
  }

  const getText = (option: SelectableOption) => String(getOptionProperty(option, props.textBy))

  const getDisabled = (option: SelectableOption) =>
    isStringOrNumber(option) ? false : getOptionProperty(option, props.disabledBy)

  const getTrackBy = (option: SelectableOption) => {
    if (props.trackBy) { return getOptionProperty(option, props.trackBy) }
    return getValue(option)
  }
  const getGroupBy = (option: SelectableOption) => getOptionProperty(option, props.groupBy)

  return {
    getValue,
    getOptionByValue,
    getText,
    getDisabled,
    getTrackBy,
    getGroupBy,
  }
}
