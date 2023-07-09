import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    options: "The array of objects with `label` and `value` properties",
    value: "Current toggle state",
    size: "Specify size for component. \"small\", \"medium\", \"large\" sizes are available",
    toggleColor: "Color of the toggle button",
    activeButtonTextColor: "The color of the button text with the selected value",
    textBy: "When `options` prop is an object, this key will be used as displayed text. Can be string (path to the key) or function of type: `(option) => option.text`",
    trackBy: "When `options` prop is an object, this key will be used to track selected `options`. Can be string (path to the key) or function of type: `(option) => option.track`",
    valueBy: "When `options` prop is an object, this key will be used as `modelValue`. Can be string (path to the key) or function of type: `(option) => option.value`",
    disabledBy: "Specify the key in the object to be used as item `disabled` prop. Can be string (path to the key) or function of type: `(option) => option.disabled`"
  },
  events: {
    input: "Emits when toggling to the different button"
  },
});
