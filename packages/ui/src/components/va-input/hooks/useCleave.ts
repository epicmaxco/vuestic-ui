import { computed, onBeforeUnmount, PropType, ref, Ref, watchEffect, type ExtractPropTypes, type WritableComputedRef } from 'vue'
import Cleave from 'cleave.js'
import { type CleaveOptions } from 'cleave.js/options'

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

export const useCleaveProps = {
  mask: { type: [String, Object] as PropType<string | Record<string, number[]> | CleaveOptions>, default: '' },
  returnRaw: { type: Boolean, default: true },
}

export const useCleave = (
  element: Ref<HTMLInputElement | undefined>,
  props: ExtractPropTypes<typeof useCleaveProps>,
  syncValue: WritableComputedRef<string | number | null>,
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

    return syncValue.value ?? ''
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
