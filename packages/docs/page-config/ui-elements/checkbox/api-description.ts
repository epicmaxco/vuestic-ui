export default {
  props: {
    value: "The value of the checkbox",
    checkedIcon: "Overrides the `checked` icon",
    indeterminateIcon: "Overrides the `indeterminate` icon",
    ariaLabel: "The aria-label of the checkbox"
  },
  events: {
    input: "Emitted when the component needs to change the value"
  }
}
