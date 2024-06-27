export type DateInputDate = Date | string | number
export type DateInputRange<T> = { start?: T | null; end?: T | null }
export type DateInputValue =
  | Date
  | Date[]
  | DateInputRange<Date>
  | undefined
  | null

export type DateInputModelValue =
  | DateInputDate
  | DateInputDate[]
  | DateInputRange<DateInputDate>
  | undefined
  | null
  | string
