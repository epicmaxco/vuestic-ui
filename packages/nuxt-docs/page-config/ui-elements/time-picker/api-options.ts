export default defineManualApi({
  props: {
    view: { types: "'hours' | 'minutes' | 'seconds'" },
    hoursFilter: { types: "(date: Date) => boolean" },
    minutesFilter: { types: "(date: Date) => boolean" },
    secondsFilter: { types: "(date: Date) => boolean" },

    // We use this prop in VaTimeInput
    hidePeriodSwitch: { hidden: true },
  },
});
