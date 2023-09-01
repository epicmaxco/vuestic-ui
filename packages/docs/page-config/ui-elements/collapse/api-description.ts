import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    value: "Current collapse state",
    header: "Text content to place in the header",
    icon: "The icon to be displayed inside a header",
    solid: "Adds borders to the collapse",
    colorAll: "Applies color to collapse contents background",
    flat: "Disables shadows and borders"
  },
  events: {
    input: "Emits when collapse is clicked"
  },
  slots: {
    default: "Body of collapse (without paddings)",
    header: "Replaces the whole component's header block",
    headerContent: "Replaces component's header block inner content",
    content: "Replaces component's content block (with paddings)"
  }
});
