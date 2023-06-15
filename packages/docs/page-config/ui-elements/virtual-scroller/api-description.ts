import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    bench: "Amount of items will be rendered before and after visible part of the list (for smooth scrolling).",
    horizontal: "Sets component state to horizontal orientation.",
    itemSize: "Average size (width or height) of the list items (can be number or string with \"px\"/\"rem\" value).",
    wrapperSize: "Size (width or height) of the component's viewport (can be number or string with \"px\"/\"rem\" value).",
    items: "Array of list items.",
    table: "Switches component to work with table rows.",
    trackBy: "Property name for identifying item.",
    disable: "Disables virtual scrolling, all items are rendered."
  },
  events: {},
  methods: {},
  slots: {
    default: "Slot for repeating content template.",
    content: "Slot to overwrite entire component's template (in case of complicated integrations)."
  }
});
