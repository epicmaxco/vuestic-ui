export const isDatesArrayInclude = (dates: Date[], date: Date): boolean => {
  return !!dates.find((d) => d.toDateString() === date.toDateString())
}

export const isDatesEqual = (date1: Date | null, date2: Date | null): boolean => (date1 && date1.toDateString()) === (date2 && date2.toDateString())
