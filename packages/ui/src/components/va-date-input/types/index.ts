export type DateInputDate = string | number | Date
export type DateInputRange = { start?: DateInputDate | null, end?: DateInputDate | null }
export type DateInputModelValue = DateInputDate | DateInputDate[] | DateInputRange | undefined
