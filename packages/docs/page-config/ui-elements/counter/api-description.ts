import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    manualInput: "Allows user to manually input value",
    label: "Sets component label",
    color: "Sets component color",
    min: "The minimum value to accept for this input",
    max: "The maximum value to accept for this input",
    step: "Step of changing input field values",
    disabled: "Disable the component",
    readonly: "Puts component in **readonly** state",
    messages: "Displays a list of hint messages (or message if using a string)",
    bordered: "Applies component `underscore` styling",
    outline: "Applies component `outline` styling",
    flat: "Applies `flat` styling of outside buttons",
    rounded: "Adds rounded corners to outside buttons",
    buttons: "Enables display of the component with external buttons",
    width: "Sets a component width",
    margins: "Sets the margin of the outside buttons",
    increaseIcon: "Sets an increase icon",
    decreaseIcon: "Sets a decrease icon",
    ariaDecreaseLabel: "The aria-label of decrease button",
    ariaIncreaseLabel: "The aria-label of increase button",
    ariaLabel: "The aria-label of content of counter",
    longPressDelay: "The number of milliseconds after which another event will be sent when you are long pressing the button"
  },
  events: {
    clickDecreaseButton: "The event is triggered when clicked decrease outside button",
    clickIncreaseButton: "The event is triggered when clicked increase outside button",
    clickDecreaseIcon: "The event is triggered when clicked decrease inner icon",
    clickIncreaseIcon: "The event is triggered when clicked increase inner icon",
    change: "The **change** input event is fired when input is submitted (when `manual-input` prop enabled)"
  },
  slots: {
    decreaseAction: "Adds an item instead of decrease icon or button",
    increaseAction: "Adds an item instead of increase icon or button",
    content: "Adds an item instead the input"
  }
});
