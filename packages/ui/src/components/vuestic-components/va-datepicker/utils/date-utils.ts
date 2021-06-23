// export const isLeapYear = (year: number): boolean => new Date(year, 1, 29).getDate() === 29

/** Returns last day of previous month */
export const getMonthDaysCount = (year: number, month: number): number => new Date(year, month + 1, 0).getDate()

export const isToday = (date: Date): boolean => date.toDateString() === new Date().toDateString()

/** @returns // TODO: */
export const getMonthStartWeekday = (year: number, month: number) => new Date(year, month, 1).getDay()

/** Returns array from 1 to length */
export const getNumbersArray = (length: number) => Array.from(Array(length).keys()).map((k) => k + 1)
