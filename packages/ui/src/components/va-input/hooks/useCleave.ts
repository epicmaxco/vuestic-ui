import {
  computed,
  PropType,
  Ref,
  type ExtractPropTypes,
  type WritableComputedRef,
} from 'vue'
import {
  formatDate,
  formatTime,
  formatGeneral,
  formatNumeral,
  formatCreditCard,
  unformatGeneral,
  unformatNumeral,
  unformatCreditCard,
  type FormatGeneralOptions,
  type FormatTimeOptions,
  type FormatNumeralOptions,
  type FormatCreditCardOptions,
  type FormatDateOptions,
} from 'cleave-zen'

interface MaskOptions extends FormatGeneralOptions, FormatDateOptions, FormatNumeralOptions, FormatCreditCardOptions, FormatTimeOptions {}
interface MaskProp {
  type: 'date' | 'time' | 'creditCard' | 'numeral' | 'general',
  options: MaskOptions
}

const DEFAULT_MASK_TOKENS: Record<string, Record<'formatter' | 'transcriber' | 'options', unknown>> = {
  creditCard: {
    formatter: formatCreditCard,
    transcriber: unformatCreditCard,
    options: {} as FormatCreditCardOptions,
  },
  date: {
    formatter: formatDate,
    transcriber: (value: string, options?: FormatDateOptions): string => {
      if (options.delimiter) {
        return value.replaceAll(options.delimiter, '')
      }
      return value
    },
    options: {
      delimiter: '/',
    } as FormatDateOptions,
  },
  time: {
    formatter: formatTime,
    transcriber: (value: string, options?: FormatTimeOptions): string => {
      if (options.delimiter) {
        return value.replaceAll(options.delimiter, '')
      }
      return value
    },
    options: {
      timePattern: ['h', 'm'],
      timeFormat: '24',
      delimiter: ':',
    } as FormatTimeOptions,
  },
  numeral: {
    formatter: formatNumeral,
    transcriber: unformatNumeral,
    options: {} as FormatNumeralOptions,
  },
  general: {
    formatter: formatGeneral,
    transcriber: unformatGeneral,
    options: {} as FormatGeneralOptions,
  },
}

export const useCleaveProps = {
  mask: { type: [String, Object] as PropType<string | MaskProp>, default: '' },
  returnRaw: { type: Boolean, default: true },
}

const useMask = (mask: string | MaskProp) => {
  const maskType = typeof mask === 'string' ? mask : mask.type
  const maskOptions = typeof mask === 'string' ? null : mask.options
  const { formatter = (v: string) => v, transcriber = (v: string) => v, options = {} } = DEFAULT_MASK_TOKENS[maskType] || {}
  return {
    formatter: (value: string) => formatter(value, { ...options, ...maskOptions }),
    transcriber: (value: string) => transcriber(value, { ...options, ...maskOptions }),
  }
}

export const useCleave = (
  element: Ref<HTMLInputElement | undefined>,
  props: ExtractPropTypes<typeof useCleaveProps>,
  syncValue: WritableComputedRef<string | number>,
  emit: (event: any, ...args: any[]) => void,
) => {
  const { formatter, transcriber } = useMask(props.mask)

  const computedValue = computed<string | number>(() => {
    return syncValue.value
  })

  const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value
    if (!props.mask) {
      syncValue.value = value
      emit('update:rawValue', value)
    } else {
      const formattedValue = formatter(value)
      syncValue.value = formattedValue
      element.value!.value = formattedValue
      emit('update:rawValue', transcriber(formattedValue))
    }
  }

  return {
    computedValue,
    onInput,
  }
}
