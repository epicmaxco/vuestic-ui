import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    target: "Applies the selector to which the backtop is bound",
    visibilityHeight: "The minimum height after which the backtop is displayed",
    speed: "Sets the scrolling speed",
    horizontalPosition: "Sets the horizontal position of the component",
    verticalPosition: "Sets the vertical position of the component",
    horizontalOffset: "Sets the horizontal offset of the component from the border of the monitor",
    verticalOffset: "Sets the vertical offset of the component from the border of the monitor",
    ariaLabel: "The aria-label of the component"
  },
  events: {
    click: "Emitted when user clicked on backtop"
  },
  slots: {
    default: "Slot for backtop content"
  }
});
