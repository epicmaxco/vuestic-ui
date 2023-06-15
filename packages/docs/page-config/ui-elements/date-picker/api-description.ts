import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    modelValue: "Date, date array or date period",
    monthNames: "Array of 12 month names",
    weekdayNames: "Array of 7 weekday names",
    firstWeekday: "Name of first weekday. Can be `Monday` or `Sunday`",
    hideWeekDays: "Hide weekday names on top of day picker",
    view: "This prop specify which year and month will be shown to user. Also, you can specify type and show year, month or day picker",
    type: "This prop will specify which value user should choose",
    showOtherMonths: "If `true`, other month days will be shown in day picker",
    highlightWeekend: "If `true` weekend will be colored",
    highlightToday: "If `true` today date will be colored",
    allowedDays: "Function that accepts date and return `false` if day is not allowed",
    allowedMonths: "Function that accepts date and return `false` if month is not allowed",
    allowedYears: "Function that accepts date and return `false` if year is not allowed",
    weekends: "Function that accepts date and return `true` if date is weekend",
    startYear: "First year that user can choose. By default is 1970",
    endYear: "Last year that user can choose. By default is current year plus 50 years",
    weekendsColor: "Color of the weekend cells (theme string or HEX string).",
    mode: "Specify if picker value is single date, multiple dates or date range."
  },
  events: {
    updateView: "Emit when DatePicker \"view type\" is changed. DatePicker view types are `\"day\"`, `\"month\"`, `\"year\"`.",
    hoverYear: "The event is triggered when the mouse hover the year cell.",
    clickYear: "The event is triggered when clicked the year cell.",
    hoverDay: "The event is triggered when the mouse hover the day cell.",
    clickDay: "The event is triggered when clicked the day cell.",
    hoverMonth: "The event is triggered when the mouse hover the month cell.",
    clickMonth: "The event is triggered when clicked the month cell."
  },
  slots: {
    buttonPrev: "Button show previous month or year.",
    buttonNext: "Button show next month or year.",
    header: "This slot is showing year and month between header buttons.",
    year: "Used to change how year will be displayed in header and picker cell.",
    month: "Used to change how month will be displayed in header and picker cell.",
    weekday: "Used to change how weekday will be displayed in picker cell.",
    day: "Used to change how day will be displayed in picker cell."
  }
});
