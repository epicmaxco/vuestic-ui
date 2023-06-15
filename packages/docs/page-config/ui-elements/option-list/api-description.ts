import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    disabledBy: "Specify the key in the object to be used as item `disabled` prop. Can be string (path to the key) or function of type: `(option) => option.disabled`",
    valueBy: "When `options` prop is an object, this key will be used as `modelValue`. Can be string (path to the key) or function of type: `(option) => option.value`",
    trackBy: "When `options` prop is an object, this key will be used to track selected `options`. Can be string (path to the key) or function of type: `(option) => option.track`",
    textBy: "When `options` prop is an object, this key will be used as displayed text. Can be string (path to the key) or function of type: `(option) => option.text`",
    options: "The array of items to be displayed",
    type: "Specify the format of component. Supported types are `\"radio\"`, `\"checkbox\"` and `\"switch\"`",
    defaultValue: "This value will be pre-selected for the stateful component",
    leftLabel: "Put the labels to the left"
  },
  events: {
    input: "Emitted on value change."
  },
  slots: {
    default: "Used to render items. Available props are:\n`option: String `&#124;` Object`,\n`isDisabled: Boolean`,\n`name: String`,\n`color: String`,\n`leftLabel: Boolean`,\n`getText: (option: String `&#124;` Object) => String`,\n`selectedValue: Array<String `&#124;` Object>`,\n`index: Number`"
  }
});
