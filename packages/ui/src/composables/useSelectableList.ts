// It's another implementation of SelectableListMixin functionality but for Composition API usage

import { getProp } from '../services/utils'
import { PropType } from 'vue'

type StringOrFunction = string | Function

export const useSelectableListProps = {
  options: { type: Array as PropType<any[]>, default: () => [] },
  textBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'text' },
  valueBy: { type: [String, Function] as PropType<StringOrFunction> },
  trackBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'value' },
  disabledBy: { type: [String, Function] as PropType<StringOrFunction>, default: 'disabled' },
}

export function useSelectableList (props: any) {
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

  const getText = (option: any): any => {
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

  return {
    isSelectableListComponent,
    getValue,
    getOptionByValue,
    getText,
    getDisabled,
    getTrackBy,
  }
}
