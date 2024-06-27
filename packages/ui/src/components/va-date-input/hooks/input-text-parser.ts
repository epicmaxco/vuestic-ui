import { isDate } from '../../../utils/is-date'
import { DateInputValue } from './../types'
import { Ref, ref } from 'vue'

export const defaultParseDateFunction = (text: string) => new Date(Date.parse(text))

const isValidDate = (d: Date) => isDate(d) && !isNaN(d.getTime())

export const useDateParser = (props: {
  parse?: (input: string, isValidRef?: Ref<boolean>) => DateInputValue,
  parseDate?: (input: string) => Date,
  delimiter: string,
  rangeDelimiter: string,
}) => {
  const isMultipleDates = (text: string) => {
    const dates = text.split(props.delimiter)

    if (dates.length < 2) { return false }

    // May be format like 'Mon, 31 Dec 2018 23:00:00 GMT' or '12, 31, 2018'
    return dates.every((date) => {
      const parsedDate = (props.parseDate || defaultParseDateFunction)(date)
      return isValidDate(parsedDate)
    })
  }
  const isRange = (text: string) => text.includes(props.rangeDelimiter)

  const isValid = ref(true)

  const parseDate = (text: string) => {
    /**
     * for american locales 01.02.2000 will be parsed as 02 Jan 2000 (not 01 Feb 2000)
     * iso 8601 (YYYY-MM-DD) solves this problem
     */
    const splitDate = text.split('.')
    const valueToParse = splitDate?.length === 3 ? splitDate.reverse().join('-') : text

    const date = (props.parseDate || defaultParseDateFunction)(valueToParse)

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
