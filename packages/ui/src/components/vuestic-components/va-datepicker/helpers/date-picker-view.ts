import { VaDatePickerView } from '../types/types'

const JANUARY_MONTH_INDEX = 0
const DECEMBER_MONTH_INDEX = 11

/** Use this class instead of native Dates to prevent reactivity issues. */
export class DatePickerView {
  year: number
  month: number
  type: VaDatePickerView

  constructor (name: VaDatePickerView = 'month', year?: number, month?: number) {
    this.year = year || new Date().getFullYear()
    this.month = month || new Date().getMonth()
    this.type = name
  }

  switchView () {
    if (this.type === 'year') {
      this.type = 'month'
    } else {
      this.type = 'year'
    }
  }

  next () {
    if (this.type === 'month') {
      this.addMonth()
    } else if (this.type === 'year') {
      this.year += 1
    }
  }

  prev () {
    if (this.type === 'month') {
      this.subMonth()
    } else if (this.type === 'year') {
      this.year -= 1
    }
  }

  addMonth () {
    if (this.month === DECEMBER_MONTH_INDEX) {
      this.year = this.year + 1
      this.month = JANUARY_MONTH_INDEX
    } else {
      this.month = this.month + 1
    }
  }

  subMonth () {
    if (this.month === JANUARY_MONTH_INDEX) {
      this.year = this.year - 1
      this.month = DECEMBER_MONTH_INDEX
    } else {
      this.month = this.month - 1
    }
  }
}
