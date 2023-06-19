import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    vertical: "Displays divider vertically",
    dashed: "If set to true, the divider line is dashed",
    inset: "If set to true, the left and right margins will be added; reduces height for vertical divider",
    orientation: "Position of the title inside divider (for horizontal only). `left`, `center` (default) or `right`"
  },
  slots: {
    default: "Insert content (for horizontal only)"
  }
});
