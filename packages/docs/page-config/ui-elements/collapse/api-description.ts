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
    default: "Collapsable content of the component",
    header: "Replaces the whole component's header block",
    headerContent: "Replaces component's header block inner content"
  }
});
