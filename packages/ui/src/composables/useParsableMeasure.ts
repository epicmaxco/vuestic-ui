import { unref, Ref } from 'vue'

type MaybeRef<T> = Ref<T> | T

export const useParsableMeasure = () => {
  const isParsableMeasure = (value: unknown): value is string => {
    if (typeof value === 'string') {
      return (!isNaN(+value) ||
        value.endsWith('px') ||
        value.endsWith('rem'))
    }
    return false
  }

  const isParsablePositiveMeasure = (value: unknown) => {
    if (typeof value === 'number') {
      return value >= 0
    }
    return isParsableMeasure(value) && parseInt(value) >= 0
  }

  const parseSizeValue = (value: MaybeRef<number | string>, pageFontSize: MaybeRef<number> = 16) => {
    const valueUnref = unref(value)
    if (typeof valueUnref === 'string') {
      const parsedValue = parseInt(valueUnref)

      if (isNaN(parsedValue)) { return 0 }

      return valueUnref.endsWith('rem') ? parsedValue * unref(pageFontSize) : parsedValue
    }
    return valueUnref
  }

  return { isParsableMeasure, isParsablePositiveMeasure, parseSizeValue }
}
