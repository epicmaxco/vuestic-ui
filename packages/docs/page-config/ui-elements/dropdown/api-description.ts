import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    anchor: "Anchor element. Dropdown will be opened when clicked on anchor. Can be `HTMLElement` or `CSS selector`",
    closeOnAnchorClick: "Dropdown will be closed when clicked on anchor",
    closeOnContentClick: "Dropdown will be closed when clicked inside dropdown content",
    closeOnFocusOutside: "Dropdown will be closed when focus is outside dropdown content and anchor",
    hoverOutTimeout: "Time in `ms` after mouse leave dropdown before it will be closed",
    hoverOverTimeout: "Time in `ms` after mouse enter dropdown before it will be opened",
    verticalScrollOnOverflow: "If true, dropdown content will adjust its height when the content is larger than available space",
    keepAnchorWidth: "If true, dropdown content will have exact same width as anchor",
    offset: "Dropdown content will be moved by main and cross axis according to current `placement`",
    placement: "Dropdown content will be placed on `placement` side of anchor",
    trigger: "Action that will triggered when open and close dropdown.",
    target: "Dropdown content parent. Dropdown content will be attached to `target` to prevent overflow",
    role: "The role attribute of the dropdown",
  },
  events: {
    anchorClick: "The event is triggered when anchor is clicked",
    anchorDblclick: "The event is triggered when anchor is double clicked",
    anchorRightClick: "The event is triggered when anchor is right clicked",
    close: "The event is triggered when dropdown is closed",
    open: "The event is triggered when dropdown is opened",
    contentClick: "The event is triggered when clicked inside dropdown content",
    focusOutside: "The event is triggered when focus is outside dropdown content and anchor",
    clickOutside: "The event is triggered when clicked outside dropdown content and anchor"
  },
  slots: {
    anchor: "Slot for anchor. When anchor is clicked, dropdown will be opened",
    default: "Dropdown content",
  }
});
