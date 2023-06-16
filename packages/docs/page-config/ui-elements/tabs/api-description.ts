import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    value: "The *name* of selected tab or *index* (if `name` prop is not specified)",
    left: "Align all items to the left",
    right: "Align all items to the right",
    center: "Align all items to the center",
    hideSlider: "Remove slider which underlines selected item",
    vertical: "Align all items vertically",
    prevIcon: "Icon to be used for scrolling backward in pagination",
    nextIcon: "Icon to be used for scrolling forward in pagination",
    hidePagination: "Hide or show pagination arrows",
    ariaMoveLeftLabel: "The aria-label of the \"move left\" button",
    ariaMoveRightLabel: "The aria-label of the \"move right\" button"
  },
  events: {
    clickNext: "Emits when pagination **next** is clicked",
    clickPrev: "Emits when pagination **prev** is clicked"
  },
  slots: {
    default: "For a content",
    tabs: "For a list of tabs"
  }
});
