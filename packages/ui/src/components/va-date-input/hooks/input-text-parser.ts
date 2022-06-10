import { Ref, ref } from 'vue'
import { DateInputModelValue } from '../types'
import isDate from 'lodash/isDate.js'

export const defaultParseDateFunction = (text: string) => new Date(Date.parse(text))

const isValidDate = (d: Date) => isDate(d) && !isNaN(d.getTime())

export const useDateParser = (props: {
  parse?: (input: string, isValidRef?: Ref<boolean>) => DateInputModelValue,
  parseDate?: (input: string) => Date,
  delimiter: string,
  rangeDelimiter: string,
}) => {
  const isMultipleDates = (text: string) => text.includes(props.delimiter)
  const isRange = (text: string) => text.includes(props.rangeDelimiter)

  const isValid = ref(true)

  const parseDate = (text: string) => {
    const date = (props.parseDate || defaultParseDateFunction)(text)

    isValid.value = isValidDate(date)

    return date
  }

  const parseDateInputValue = (text: string) => {
    isValid.value = true

    if (props.parse) {
      return props.parse(text, isValid)
    }

    if (isMultipleDates(text)) {
      return text.split(props.delimiter).map(parseDate)
    }

    if (isRange(text)) {
      const [start, end] = text.split(props.rangeDelimiter).map(parseDate)
      return { start, end }
    }

    return parseDate(text)
  }

  return {
    parseDateInputValue,
    isValid,
  }
}
