export type DatePickerRange = { start?: Date | null, end?: Date | null }
export type DatePickerModelValue = Date | Date[] | DatePickerRange | undefined
export type DatePickerViewType = 'year' | 'month' | 'day'
export type DatePickerView = { type: DatePickerViewType, year: number, month: number }
export type DatePickerViewProp = Partial<DatePickerView>
export type DatePickerType = 'year' | 'month' | 'day'
export type DatePickerMode = 'single' | 'multiple' | 'range' | 'auto'
