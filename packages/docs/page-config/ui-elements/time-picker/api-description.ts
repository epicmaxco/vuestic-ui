import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    ampm: "Use 12-hours time format",
    hoursFilter: "Function that allows you to hide some specific hours",
    minutesFilter: "Function that allows you to hide some specific minutes",
    secondsFilter: "Function that allows you to hide some specific seconds",
    view: "View specifying which columns will be shown",
    periodUpdatesModelValue: "If user will change period it will automatically update model value. You can turn off it and am/pm switch will only change view.",
    framed: "Adds borders to center of the picker"
  },
});
