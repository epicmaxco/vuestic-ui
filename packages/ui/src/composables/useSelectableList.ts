// It's another implementation of SelectableListMixin functionality but for Composition API usage

import { getProp } from '../services/utils'
import { PropType } from 'vue'

export type SelectableOption = string | number | Record<string, unknown>

type StringOrFunction = string | ((option: SelectableOption) => string)

export type SelectableListProps = {
  options: SelectableOption[]
  textBy: StringOrFunction
  valueBy: StringOrFunction
  trackBy: StringOrFunction
  disabledBy: StringOrFunction
  groupBy: StringOrFunction
}

export const useSelectableListProps = {
  options: { type: Array as PropType<SelectableOption[]>, default: () => [] },
  textBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'text' },
  valueBy: { type: [String, Function] as PropType<StringOrFunction>, default: '' },
  trackBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'value' },
  disabledBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'disabled' },
  groupBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'group' },
}

export function useSelectableList (props: SelectableListProps) {
  const isSelectableListComponent = true

  const isStringOrNumber = (option: SelectableOption): option is (string | number) => {
    const typeOfOption = typeof option
    return typeOfOption === 'string' || typeOfOption === 'number'
  }

  const getOptionProperty = (option: SelectableOption, selector: StringOrFunction) => {
    return !selector || isStringOrNumber(option)
      ? option
      : getProp(option, selector)
  }

  const getValue = (option: SelectableOption) => getOptionProperty(option, props.valueBy)
  const getOptionByValue = (value: SelectableOption) => {
    if (!props.valueBy) { return value }

    return props.options.find((option: SelectableOption) => value === getValue(option)) || value
  }
  const getText = (option: SelectableOption): string => getOptionProperty(option, props.textBy)
  const getDisabled = (option: SelectableOption): boolean => getOptionProperty(option, props.disabledBy)
  const getTrackBy = (option: SelectableOption) => getOptionProperty(option, props.trackBy)
  const getGroupBy = (option: SelectableOption) => getOptionProperty(option, props.groupBy)

  return {
    isSelectableListComponent,
    getValue,
    getOptionByValue,
    getText,
    getDisabled,
    getTrackBy,
    getGroupBy,
  }
}
