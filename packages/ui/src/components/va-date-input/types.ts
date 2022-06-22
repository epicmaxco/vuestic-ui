export type DateInputDate = string | Date
export type DateInputRange<T> = { start?: T | null, end?: T | null }
export type DateInputValue = Date | Date[] | DateInputRange<Date>
export type DateInputModelValue = DateInputDate | DateInputDate[] | DateInputRange<DateInputDate> | undefined
