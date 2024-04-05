import { computed, onBeforeUnmount, PropType, ref, Ref, watchEffect, type ExtractPropTypes, type WritableComputedRef } from 'vue'
import Cleave from 'cleave.js'
import { type CleaveOptions } from 'cleave.js/options'
import {
  formatDate,
  formatTime,
  formatGeneral,
  formatNumeral,
  formatCreditCard,
  unformatGeneral,
  unformatNumeral,
  unformatCreditCard,
} from 'cleave-zen'

const DEFAULT_MASK_TOKENS: Record<string, Record<string, unknown>> = {
  creditCard: {
    creditCard: true,
  },
  date: {
    date: true,
    datePattern: ['d', 'm', 'Y'],
  },
  time: {
    time: true,
    timePattern: ['h', 'm'],
    timeFormat: '24',
  },
  numeral: {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
  },
}

const MASKS = {
  creditCard: {
    formatter: formatCreditCard,
    transcriber: unformatCreditCard,
    options: {},
  },
  date: {
    formatter: formatDate,
    transcriber: (value: any, options: any) => {
      if (options.delimiter) {
        return value.replaceAll(options.delimiter, '')
      }
      return value
    },
    options: {
      delimiter: '/',
    },
  },
  time: {
    formatter: formatTime,
    transcriber: (value: any, options: any) => value.replaceAll(':', ''),
    options: {
      timePattern: ['h', 'm'],
      timeFormat: '24',
    },
  },
  numeral: {
    formatter: formatNumeral,
    transcriber: unformatNumeral,
    options: {},
  },
  general: {
    formatter: formatGeneral,
    transcriber: unformatGeneral,
    options: {},
  },
} as any

export const useCleaveProps = {
  // TODO: types
  mask: { type: [String, Object] as any, default: '' },
  // mask: { type: [String, Object] as PropType<string | Record<string, number[]> | CleaveOptions>, default: '' },
  returnRaw: { type: Boolean, default: true },
}

const useMask = (mask: string | { type: string, options: any }) => {
  const maskType = typeof mask === 'string' ? mask : mask.type
  const maskOptions = typeof mask === 'string' ? null : mask.options
  const { formatter = (v: any) => v, transcriber = (v: any) => v, options = {} } = MASKS[maskType] || {}
  return {
    formatter: (value: any) => formatter(value, { ...options, ...maskOptions }),
    transcriber: (value: any) => transcriber(value, { ...options, ...maskOptions }),
  }
}

export const useCleave = (
  element: Ref<HTMLInputElement | undefined>,
  props: ExtractPropTypes<typeof useCleaveProps>,
  syncValue: WritableComputedRef<string | number>,
) => {
  const cleave = ref<Cleave>()

  const getMask = (mask: CleaveOptions | string) => {
    if (typeof mask === 'string') {
      return DEFAULT_MASK_TOKENS[mask] ? { ...DEFAULT_MASK_TOKENS[mask] } : null
    }
    return { ...mask }
  }

  const destroyCleave = () => {
    if (cleave.value) { cleave.value.destroy() }
  }

  const mask = computed(() => getMask(props.mask))

  const cleaveEnabled = computed(() => {
    return mask.value && Object.keys(mask.value).length
  })

  watchEffect(() => {
    destroyCleave()

    if (!element.value) { return }

    // Do not create cleave instance if mask is not defined
    if (!cleaveEnabled.value || !mask.value) { return }

    cleave.value = new Cleave(element.value, mask.value)

    cleave.value!.properties.onValueChanged = ({ target: { rawValue, value } }) => {
      if (props.returnRaw) {
        syncValue.value = rawValue
      } else {
        syncValue.value = value
      }
    }
  })

  onBeforeUnmount(() => { destroyCleave() })

  const computedValue = computed<string | number>(() => {
    if (cleave.value) {
      if (props.returnRaw && syncValue.value === cleave.value.getRawValue()) {
        return cleave.value.getFormattedValue()
      }
    }

    return syncValue.value
  })

  const onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value

    if (!cleaveEnabled.value) {
      syncValue.value = value
    }
  }

  return {
    cleave,
    cleaveEnabled,
    computedValue,
    onInput,
  }
}

export const useCleaveZen = (
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
      syncValue.value = formatter(value)
      element.value!.value = formatter(value)
      emit('update:rawValue', transcriber(syncValue.value))
    }
  }

  return {
    computedValue,
    onInput,
  }
}
