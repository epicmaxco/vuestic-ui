import { VaDatePickerModelValue, VaDatePickerModelValuePeriod } from '../../va-date-picker/types/types'
import { ref } from 'vue'

type Range = {
  start: number | string | Date;
  end: number | string | Date | null;
}

export default function parseInputToDate (value: VaDatePickerModelValue | undefined | Range | string | number) {
  const isArray = Array.isArray(value)
  const isObject = typeof value === 'object'

  function isNumber (input: unknown) {
    return typeof input === 'number'
  }

  function isString (input: unknown) {
    return typeof input === 'string'
  }

  function isDate (input: unknown) {
    return input instanceof Date
  }

  if (isNumber(value) || isString(value)) {
    return ref<VaDatePickerModelValue>(new Date(value as string | number))
  }

  if (isArray && (value as Date[]).every(date => isNumber(date) || isString(date) || isDate(date))) {
    return ref<VaDatePickerModelValue>(value.map(date => new Date(date)))
  }

  if (isObject && (value as Range).start) {
    const start = new Date((value as Range).start as string | number | Date) as Date
    const end = (value as Range).end

    return ref<VaDatePickerModelValuePeriod>({
      start,
      end: end !== null ? new Date(end as string | number | Date) as Date : null,
    })
  }

  return ref<VaDatePickerModelValue | undefined>(value as VaDatePickerModelValue)
}
