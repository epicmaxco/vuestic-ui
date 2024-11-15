import { toRef, type PropType } from 'vue'
import { useOptions, Option, OptionKeyBy } from '../std/state/useOptions'

export const defineOptionsControlProps = <O>() => {
  return {
    options: { type: Array as PropType<O[]>, default: () => [] as any[] },
    textBy: { type: [String, Function] as PropType<OptionKeyBy<O>>, default: 'text' },
    valueBy: { type: [String, Function] as PropType<OptionKeyBy<O>>, default: '' },
    trackBy: { type: [String, Function] as PropType<OptionKeyBy<O>>, default: '' },
    disabledBy: { type: [String, Function] as PropType<OptionKeyBy<O>>, default: 'disabled' },
    groupBy: { type: [String, Function] as PropType<OptionKeyBy<O>>, default: 'group' },
  }
}

/**
 * Not yet ready for use, because it's not clear how to deal with ExtractPropTypes generic issue.
 * @deprecated
 */
export function useOptionsControl<O> (props: {
  readonly options: O[],
  textBy: OptionKeyBy<O>,
  valueBy: OptionKeyBy<O>,
  trackBy: OptionKeyBy<O>,
  disabledBy: OptionKeyBy<O>,
  groupBy: OptionKeyBy<O>,
}) {
  const { getBy, resolveOptionByKey } = useOptions(toRef(props, 'options'))

  const getTrackBy = (option: O): string | number | symbol | undefined => {
    return props.trackBy ? getBy(option, props.trackBy) : getValue(option)
  }

  const getDisabled = (option: O): boolean => {
    return Boolean(getBy(option, props.disabledBy) ?? false)
  }

  const getText = (option: O): string => {
    const optionText = getBy(option, props.textBy)

    return String(optionText ?? '')
  }

  // group by is used as object's key, so it can be only string or number
  const getGroupBy = (option: O): string | number | undefined => {
    return getBy(option, props.groupBy) as string | number | undefined
  }

  // value can be any type except array
  const getValue = (option: O) => getBy(option, props.valueBy)

  const tryResolveByValue = (value: unknown): O | undefined => {
    return resolveOptionByKey(props.valueBy, value)
  }

  return {
    tryResolveByValue,
    getValue,
    getText,
    getDisabled,
    getTrackBy,
    getGroupBy,
  }
}
