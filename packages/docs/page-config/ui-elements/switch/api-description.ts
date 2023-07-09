import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    color: "Color of switch",
    size: "Specify size for component. `\"small\"`, `\"medium\"`, `\"large\"` sizes are available",
    label: "Switch label",
    leftLabel: "Moves label to the left",
    readonly: "Makes switch read only",
    trueLabel: "Label when checked",
    falseLabel: "Label when unchecked",
    trueInnerLabel: "Inner label when checked",
    falseInnerLabel: "Inner label when unchecked",
    value: "Switch value",
    trueValue: "Value when checked",
    falseValue: "Value when unchecked",
    arrayValue: "Takes the value of a switch in an array of switches",
    ariaLabel: "The aria-label of the component",
    offColor: "The background color when switch is off"
  },
  slots: {
    default: "Slot for label.",
    innerLabel: "Slot for inner label."
  }
});
