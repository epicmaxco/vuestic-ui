export type VaDateInputDate = string | number | Date
export type VaDateInputRange = { start?: VaDateInputDate | null, end?: VaDateInputDate | null }
export type VaDateInputModelValue = VaDateInputDate | VaDateInputDate[] | VaDateInputRange | undefined
