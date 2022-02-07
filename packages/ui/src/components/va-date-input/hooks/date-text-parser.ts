import { Ref, ref } from 'vue'
import { VaDatePickerModelValue } from '../../va-date-picker/types/types'

const defaultParseDateFunction = (text: string) => new Date(Date.parse(text))

const isInvalidDate = (d: Date) => !d || (d instanceof Date && isNaN(d.getTime()))

export const useDateParser = (props: {
  parse?: (input: string, isValidRef?: Ref<boolean>) => VaDatePickerModelValue,
  parseDate?: (input: string) => Date,
  delimiter: string,
  rangeDelimiter: string,
}) => {
  const isTextIsMultipleDates = (text: string) => text.includes(props.delimiter)
  const isTextIsDateRange = (text: string) => text.includes(props.rangeDelimiter)

  const getParseDateFn = () => props.parseDate || defaultParseDateFunction

  const isValid = ref(true)

  const parseDate = (text: string) => {
    const parse = getParseDateFn()

    const result = parse(text)

    if (isInvalidDate(result)) {
      isValid.value = false
    }

    return result
  }

  const parseDateInputValue = (text: string) => {
    isValid.value = true

    if (props.parse) {
      return props.parse(text, isValid)
    }

    if (isTextIsMultipleDates(text)) {
      return text.split(props.delimiter).map((dateText) => parseDate(dateText))
    }

    if (isTextIsDateRange(text)) {
      const [start, end] = text.split(props.rangeDelimiter).map((dateText) => parseDate(dateText))
      return { start, end }
    }

    return parseDate(text)
  }

  return {
    parseDateInputValue,
    isValid,
  }
}
