import { Ref } from 'vue'

export interface TimePickerProps {
  ampm: boolean
  hidePeriodSwitch: boolean
  periodUpdatesModelValue: boolean
  view: 'hours' | 'minutes' | 'seconds'
  modelValue?: Date
  hoursFilter?: (h: number) => boolean
  minutesFilter?: (h: number) => boolean
  secondsFilter?: (h: number) => boolean
  readonly?: boolean
}

export type ModelValueRef = Ref<Date | null | undefined>
