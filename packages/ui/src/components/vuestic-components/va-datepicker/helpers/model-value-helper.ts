import { VaDatePickerModelValue, VaDatePickerModelValuePeriod } from '../types/types'

export const isPeriod = (value: VaDatePickerModelValue): value is VaDatePickerModelValuePeriod => {
  return typeof (value as any).start !== 'undefined' && typeof (value as any).end !== 'undefined'
}
export const isSingleDate = (value: VaDatePickerModelValue): value is Date => value instanceof Date
export const isDates = (value: VaDatePickerModelValue): value is Date[] => Array.isArray(value)
