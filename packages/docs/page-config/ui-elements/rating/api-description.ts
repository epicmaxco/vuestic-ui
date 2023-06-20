import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    value: "The rating value",
    icon: "The icon displayed when icon is filled",
    halfIcon: "The icon displayed when icon is half-filled (requires **`halves`**)",
    emptyIcon: "The icon displayed when icon is empty (requires **`halves`**)",
    readonly: "Disables all user interaction effects (pointer, hover)",
    numbers: "When `true`, numbers from 1 to **`max`** are rendered instead of icons",
    halves: "Allow to select half of the item",
    max: "The amount of items to display",
    clearable: "Allows the components value to be set to 0. Triggered by clicking on currently selected icon",
    hover: "Adds visual feedback when hovering on items",
    texts: "The array of captions to be used with each value. The array length should be equal to **`max`** prop",
    textColor: "Color of text captions",
    unselectedColor: "Specifies the color of unselected items (by default **`color`** prop is used)",
    ariaLabel: "The aria-label of the component",
    ariaItemLabel: "The aria-label of rating items of the component"
  }
});
