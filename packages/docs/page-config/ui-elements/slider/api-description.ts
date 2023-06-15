import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    range: "Transforms single value slider into range slider.",
    value: "Numeric value(s) of slider.",
    trackLabel: "Label of slider track.",
    color: "Color of slider.",
    trackColor: "Color of slider base track.",
    labelColor: "Color of slider label.",
    trackLabelVisible: "Toggles track label visibility.",
    min: "Minimum value.",
    max: "Maximum value.",
    step: "Slider value step.",
    label: "Slider label",
    invertLabel: "Moves label to opposite side.",
    disabled: "Disables slider.",
    readonly: "Makes slider read only.",
    pins: "Adds step marks to a slider track.",
    iconPrepend: "Icon at the start of slider.",
    iconAppend: "Icon at the end of slider.",
    vertical: "Makes slider vertical.",
    showTrack: "Toggles track display.",
    ariaLabel: "The aria-label of the component"
  },
  events: {
    dragStart: "Emitted on drag start.",
    dragEnd: "Emitted on drag end.",
    change: "Emitted on value input.",
    input: "Emitted on value change."
  },
  slots: {
    append: "Slot for input after slider.",
    prepend: "Slot for input before slider.",
    label: "Replaces the default label.",
    trackLabel: "The content of the `track-label`. Slot scope has access to `value` and `order` (for `range` type) variables."
  }
});
