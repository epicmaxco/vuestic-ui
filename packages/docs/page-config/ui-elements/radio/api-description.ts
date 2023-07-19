import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    value: "Model of the component",
    option: "Option value that model is updated to when an option is selected",
    options: "Array of options to be rendered",
    tabindex: "Sets a custom tabindex",
    textBy: "This prop is used to get the text of the option if option is an object",
    trackBy: "In case there are options with the same value, to distinguish them you can use this prop",
    valueBy: "This prop is used to get the value of the option if option is an object. If not provided, the option itself will be used as a value",
    disabledBy: "This prop is used to get the disabled state of the option if option is an object",
    ariaLabel: "Sets aria-label attribute",
  },
  slots: {
    default: "Use this slot to pass a custom content as text to the component.",
    icon: "Use this slot to pass a custom icon to the component.",
  }
});
