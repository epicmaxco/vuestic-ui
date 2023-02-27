import type { ExtractPropTypes, PropType } from 'vue'

import { getValueByKey } from '../utils/value-by-key'
import { warn } from '../utils/console'

type AnyObject = Record<string, any>
export type SelectableOption = string | number | boolean | AnyObject
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

  const getOptionByValue = (value: SelectableOption): SelectableOption => {
    // if value is an object, it should be selectable option itself
    if ((!value && value !== 0 && value !== false) || typeof value === 'object') { return value }

    const optionByValue = props.options.find((option) => value === getValue(option))

    if (optionByValue === undefined) {
      warn(`[useSelectableList]: can not find option in options list (${props.options}) by provided value (${value})!`)

      return value
    }

    return optionByValue
  }

  const getTrackBy = (option: SelectableOption): string | number => {
    console.log()
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
  const getGroupBy = (option: AnyObject): string | number => {
    return getOptionProperty(option, props.groupBy)
  }

  // value can be any type except array
  const getValue = (option: SelectableOption) => getOptionProperty(option, props.valueBy)

  return {
    getValue,
    getOptionByValue,
    getText,
    getDisabled,
    getTrackBy,
    getGroupBy,
  }
}
