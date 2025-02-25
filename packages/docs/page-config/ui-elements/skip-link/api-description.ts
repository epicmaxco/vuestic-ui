import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    target: "Selector to the target component.",
    position: "Position on the page.",
  },
  slots: {
    default: "Skip link content slot.",
  }
});
