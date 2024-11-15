import { unref, PropType, computed, ref, watch } from 'vue'
import { PropAsOptions } from './types'
import { useDocument } from '../../ssr/useDocument'
import { makeSharedComposable } from '../makeSharedComposable'
import { useEvent } from '../../event/useEvent'

export type LengthString = `${number}px` | `${number}rem`

export const isLengthValue = (value: unknown): value is LengthString => {
  if (typeof value === 'string') {
    return (!isNaN(+value) ||
      value.endsWith('px') ||
      value.endsWith('rem'))
  }
  return false
}

export const isPositiveLengthValue = (value: unknown) => {
  if (typeof value === 'number') {
    return value >= 0
  }
  return isLengthValue(value) && parseInt(value) >= 0
}

export const makeLengthProp = <P extends PropAsOptions<any>>(prop: P) => {
  if (!prop.type) {
    prop.type = [String, Number] as unknown as PropType<LengthString | number>
  }

  return prop as P & { type: unknown extends P['type'] ? PropType<LengthString | number> : P['type'] }
}

const usePageFontSize = makeSharedComposable(() => {
  const document = useDocument()

  const fontSize = ref(16)

  watch(document, () => {
    if (!document.value) { return }

    fontSize.value = parseFloat(getComputedStyle(document.value.documentElement).fontSize)
  }, { immediate: true })

  useEvent('resize', () => {
    fontSize.value = parseFloat(getComputedStyle(document.value!.documentElement).fontSize)
  })

  return fontSize
})

export const useLengthProp = <K extends string, P extends { [key in K]?: number | string } >(props: P, key: K) => {
  const pageFontSize = usePageFontSize()

  const numericComputed = computed<Exclude<P[K], LengthString>>(() => {
    const numeric = props?.[key]

    if (typeof numeric === 'number') {
      return numeric as Exclude<P[K], LengthString>
    }

    if (typeof numeric === 'undefined') {
      return undefined as Exclude<P[K], LengthString>
    }

    if (typeof numeric !== 'string') {
      return numeric as Exclude<P[K], LengthString>
    }

    const parsedValue = parseInt(numeric)

    if (isNaN(parsedValue)) { return 0 as Exclude<P[K], LengthString> }

    return numeric.endsWith('rem') ? parsedValue * unref(pageFontSize) as Exclude<P[K], LengthString> : parsedValue as Exclude<P[K], LengthString>
  })

  return numericComputed
}

export const useLength = () => {
  const pageFontSize = usePageFontSize()

  const parsedValue = (num: number | LengthString) => {
    if (typeof num === 'string') {
      const parsedValue = parseInt(num)

      if (isNaN(parsedValue)) { return 0 }

      return num.endsWith('rem') ? parsedValue * unref(pageFontSize) : parsedValue
    }

    return num
  }

  return parsedValue
}
