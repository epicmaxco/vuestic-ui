import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    value: "The array of currently opened collapses",
    multiple: "Allows to expand multiple components",
    inset: "Collapse becomes smaller when activated",
    popout: "Collapse becomes bigger when activated"
  },
  events: {
    input: "Emits when any of collapses is clicked"
  },
  slots: {
    default: "Contains collapses"
  }
});
