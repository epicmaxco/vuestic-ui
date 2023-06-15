import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    horizontal: "Enables horizontal scrolling.",
    vertical: "Enables vertical scrolling.",
    rtl: "Moves scrollbar to the left side of the container (depends on `vertical` prop)."
  },
});
