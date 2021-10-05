import { Ref, ref } from 'vue'
import { VaDatePickerModelValue } from '../../va-date-picker/types/types'

const defaultParseDateFunction = (text: string) => {
  const d = new Date()
  const time = text.match(/(\d+)(?::(\d\d))?\s*(p?)/)

  if (!time) { return null }

  d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0))
  d.setMinutes(parseInt(time[2]) || 0)
  return d
}

export const useTimeParser = (props: {
  parse?: (input: string, isValidRef?: Ref<boolean>) => Date,
  delimiter: string,
  rangeDelimiter: string,
}) => {
  const isTextIsMultipleDates = (text: string) => text.includes(props.delimiter)
  const isTextIsDateRange = (text: string) => text.includes(props.rangeDelimiter)

  const getParseDateFn = () => props.parse || defaultParseDateFunction

  const isValid = ref(true)

  const parseDate = (text: string) => {
    const parse = getParseDateFn()

    const result = parse(text)

    if (!result) { isValid.value = false }

    return result
  }

  const parse = (text: string) => {
    isValid.value = true

    if (props.parse) {
      return props.parse(text, isValid)
    }

    // if (isTextIsMultipleDates(text)) {
    //   return text.split(props.delimiter).map((dateText) => parseDate(dateText))
    // }

    // if (isTextIsDateRange(text)) {
    //   const [start, end] = text.split(props.rangeDelimiter).map((dateText) => parseDate(dateText))
    //   return { start, end }
    // }

    return parseDate(text)
  }

  return {
    parse,
    isValid,
  }
}
