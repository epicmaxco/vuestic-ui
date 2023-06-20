import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Virtual Scroller"),
    block.paragraph("The `va-virtual-scroller` component allows you to use long lists without need to render every list child element but only visible ones depending on the current state of the scroll."),

    block.subtitle("Examples"),

    block.example("Default", { title: "Default" }),

    block.example("Horizontal", {
      title: "Horizontal",
      description: "The `horizontal` prop allows you to change component's orientation."
    }),

    block.example("Bench", {
      title: "Bench",
      description: "The `bench` prop allows you to make scrolling smooth by rendering additional but not visible items at the start or end of the list. For example, `bench` prop with value `10` will render additional ~10 items before the visible list start and ~10 after the visible list end."
    }),

    block.example("CustomKey", {
      title: "Custom Key",
      description: "The `trackBy` prop allows you to specify the key name for list items rendering."
    }),

    block.example("ItemSize", {
      title: "Item Size",
      description: "The `itemSize` prop allows you to specify the list item size (width or height - depends on `horizontal` prop value). For example, acceptable values are: 5, \"5\", \"5px\", \"5rem\". The component is recalculating average item's size ourselves on every scroll event and max value (`itemSize` or calculated one) will be used. We recommend to set at least minimal item size via this prop to prevent possible performance issues during first rendering."
    }),

    block.example("DifferentContent", {
      title: "Any list items",
      description: "`va-virtual-scroller` component allows you to create not only 'modest' list with primitive elements but also use it for scrolling card, table rows etc."
    }),

    block.subtitle("API"),
    block.api("VaVirtualScroller", apiDescription, apiOptions),
  ],
});
