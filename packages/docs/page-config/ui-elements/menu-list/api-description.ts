import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    textBy: 'When `options` prop items are an objects, this key will be used as displayed text. Can be string (path to the key) or function of type: `(option) => option.text`',
    valueBy: 'When `options` prop items are an objects, this key will be used in `selected` event. Can be string (path to the key) or function of type: `(option) => option.value`',
    trackBy: 'When `options` prop items are an objects, this key will be used to track selected `options`. Can be string (path to the key) or function of type: `(option) => option.track`',
    groupBy: 'When `options` prop items are an objects, this key will be used to check correct option group',
    disabledBy: "Specify the key in the object to be used as item `disabled` prop. Can be string (path to the key) or function of type: `(option) => option.disabled`",
    options: "Available options that the user can select from",
  },
  events: {
    selected: 'Emitted when an option is selected. Returns the selected option value as first argument and the selected option as second argument',
  },
  slots: {
    anchor: "Slot for anchor. When anchor is clicked, dropdown will be opened",
    default: "Dropdown content",
  }
});
