import { VaDatePickerView, VaDatePickerViewType } from '../types/types'

const JANUARY_MONTH_INDEX = 0
const DECEMBER_MONTH_INDEX = 11

export const ViewHelper = {
  init (view: any) {
    return {
      type: 'day', year: new Date().getFullYear(), month: new Date().getMonth(), ...view,
    }
  },

  updateViewType (view: VaDatePickerView, type: VaDatePickerViewType) {
    return { ...view, type }
  },

  next (view: VaDatePickerView) {
    const v = this.init(view)

    if (v.type === 'day') {
      this.addMonth(v)
    } else if (v.type === 'month') {
      v.year += 1
    }

    return v
  },

  prev (view: VaDatePickerView) {
    const v = this.init(view)

    if (v.type === 'day') {
      this.subMonth(v)
    } else if (v.type === 'month') {
      v.year -= 1
    }

    return v
  },

  addMonth (view: VaDatePickerView) {
    if (view.month === DECEMBER_MONTH_INDEX) {
      view.year = view.year + 1
      view.month = JANUARY_MONTH_INDEX
    } else {
      view.month = view.month + 1
    }
  },

  subMonth (view: VaDatePickerView) {
    if (view.month === JANUARY_MONTH_INDEX) {
      view.year = view.year - 1
      view.month = DECEMBER_MONTH_INDEX
    } else {
      view.month = view.month - 1
    }
  },
}

/** Use this class instead of native Dates to prevent reactivity issues. */
// export class DatePickerView {
//   year: number
//   month: number
//   type: VaDatePickerView

//   constructor (name: VaDatePickerView = 'month', year?: number, month?: number) {
//     this.year = year || new Date().getFullYear()
//     this.month = month || new Date().getMonth()
//     this.type = name
//   }

//   switchView () {
//     if (this.type === 'day') {
//       this.type = 'month'
//     } else {
//       this.type = 'day'
//     }
//   }

//   next () {
//     if (this.type === 'day') {
//       this.addMonth()
//     } else if (this.type === 'month') {
//       this.year += 1
//     }
//   }

//   prev () {
//     if (this.type === 'day') {
//       this.subMonth()
//     } else if (this.type === 'month') {
//       this.year -= 1
//     }
//   }

//   addMonth () {
//     if (this.month === DECEMBER_MONTH_INDEX) {
//       this.year = this.year + 1
//       this.month = JANUARY_MONTH_INDEX
//     } else {
//       this.month = this.month + 1
//     }
//   }

//   subMonth () {
//     if (this.month === JANUARY_MONTH_INDEX) {
//       this.year = this.year - 1
//       this.month = DECEMBER_MONTH_INDEX
//     } else {
//       this.month = this.month - 1
//     }
//   }
// }
