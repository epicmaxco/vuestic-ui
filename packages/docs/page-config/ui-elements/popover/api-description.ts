import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    title: "Sets the title of the popover",
    message: "Message which showed in a popover",
    trigger: "Event on which popover is triggered",
    open: "Shows popover",
    placement: "Sets a popover position. [More about placements](/ui-elements/dropdown#placement-and-offset)",
    autoHide: "Adds the ability to hide popover when clicked outside",
    hoverOverTimeout: "Delay before opening",
    hoverOutTimeout: "Delay before closing",
    ariaLabel: "the aria-label of anchor slot of dropdown of the component",
    closeOnAnchorClick: "Popover will be closed when anchor is clicked",
    closeOnContentClick: "Popover will be closed when clicked inside popover content",
    keepAnchorWidth: "If true, popover content will have exact same width as anchor",
    offset: "Dropdown content will be moved by main and cross axis according to current `placement`"
  },
  slots: {
    icon: "By default replaces with a `va-icon` and icon name from `icon` property",
    title: "Custom title slot",
    body: "Custom body slot"
  }
});
