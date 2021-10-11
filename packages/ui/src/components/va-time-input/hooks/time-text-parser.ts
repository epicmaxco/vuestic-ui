import { Ref, ref } from 'vue'

const parse = (text: string) => {
  const m = text.match(/[0-9]{1,2}/g)

  if (!m) { return [] }

  return m.map((s) => Number(s))
}

const parsePeriod = (text: string) => {
  const m = text.match(/PM|pm|Am|am/)

  if (!m) { return null }

  return Number(m[0].toLowerCase() === 'pm')
}

const defaultParseDateFunction = (text: string) => {
  const d = new Date()

  const [h, m, s] = parse(text)
  const period = parsePeriod(text)

  if (!h) { return null }

  const is12format = period !== null && h <= 12
  const isPM = is12format && !!period
  // Switch 12 to 0, because of 12h format
  const fh = is12format ? (h === 12 ? 0 : h) : h

  d.setHours(Math.min((fh || 0), is12format ? 12 : 24) + (isPM ? 12 : 0))
  d.setMinutes(Math.min(m || 0, 60))
  d.setSeconds(Math.min(s || 0, 60))

  return d
}

export const useTimeParser = (props: {
  parse?: (input: string, isValidRef?: Ref<boolean>) => Date,
}) => {
  // const isTextIsMultipleDates = (text: string) => text.includes(props.delimiter)
  // const isTextIsDateRange = (text: string) => text.includes(props.rangeDelimiter)

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

    // if (props.parse) {
    //   return props.parse(text, isValid)
    // }

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
