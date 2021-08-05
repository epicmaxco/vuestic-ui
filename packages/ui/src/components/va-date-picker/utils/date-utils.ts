
export const isDatesDayEqual = (date1: Date | null, date2: Date | null): boolean => date1?.toDateString() === date2?.toDateString()

export const isDatesMonthEqual = (date1: Date | null, date2: Date | null): boolean => {
  return date1?.getFullYear() === date2?.getFullYear() && date1?.getMonth() === date2?.getMonth()
}

export const isDatesYearEqual = (date1: Date | null, date2: Date | null): boolean => {
  return date1?.getFullYear() === date2?.getFullYear()
}

export const createYearDate = (year: number) => {
  const date = new Date()
  date.setFullYear(year)
  return date
}

export const isDatesArrayIncludeDay = (dates: Date[], date: Date): boolean => {
  return !!dates.find((d) => isDatesDayEqual(d, date))
}

export const isDatesArrayIncludeMonth = (dates: Date[], date: Date): boolean => {
  return !!dates.find((d) => isDatesMonthEqual(d, date))
}
