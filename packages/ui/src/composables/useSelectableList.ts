// It's another implementation of SelectableListMixin functionality but for Composition API usage

import { getProp } from '../services/utils'
import { PropType } from 'vue'

type StringOrFunction = string | ((option: any) => string)

export type SelectableListProps = {
  options: any[]
  textBy: StringOrFunction
  valueBy: StringOrFunction
  trackBy: StringOrFunction
  disabledBy: StringOrFunction
  groupBy: StringOrFunction
}

export const useSelectableListProps = {
  options: { type: Array as PropType<any[]>, default: () => [] },
  textBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'text' },
  valueBy: { type: [String, Function] as PropType<StringOrFunction>, default: '' },
  trackBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'value' },
  disabledBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'disabled' },
  groupBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'group' },
}

export function useSelectableList (props: SelectableListProps) {
  const isSelectableListComponent = true

  const isStringOrNumber = (option: any): boolean => {
    const typeOfOption = typeof option
    return typeOfOption === 'string' || typeOfOption === 'number'
  }

  const getValue = (option: any) => {
    if (!props.valueBy) { return option }

    return isStringOrNumber(option)
      ? option
      : getProp(option, props.valueBy)
  }

  const getOptionByValue = (value: any) => {
    if (!props.valueBy) { return value }

    return props.options.find((option: any) => value === getValue(option)) || value
  }

  const getText = (option: any) => {
    return isStringOrNumber(option)
      ? option
      : getProp(option, props.textBy)
  }

  const getDisabled = (option: any) => {
    return typeof option !== 'string' && getProp(option, props.disabledBy)
  }

  const getTrackBy = (option: any) => {
    return isStringOrNumber(option)
      ? option
      : getProp(option, props.trackBy)
  }

  const getGroupBy = (option: any) => {
    return isStringOrNumber(option)
      ? option
      : getProp(option, props.groupBy)
  }

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
