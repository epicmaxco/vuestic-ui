import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    disableDropdown: "Disables the dropdown menu.",
    disableButton: "Disables the button.",
    split: "Divides the button into two parts. This is useful when you have main action (button) and a number of secondary actions (icon + dropdown).",
    splitTo: "Sets a vue navigation link in a split component.",
    splitHref: "Sets a native navigation link in a split component.",
    icon: "Applies a custom icon in the dropdown section.",
    hideIcon: "Hide icon (when `split` is disabled).",
    openedIcon: "Applies a custom icon in the dropdown section when the dropdown is opened.",
    placement: "Sets the placement of the dropdown content. [More about placements](/ui-elements/dropdown#placement-and-offset)",
    keepAnchorWidth: "Keeps anchor position the same.",
    offset: "Sets the distance between dropdown and anchor.",
    modelValue: "Sets a dropdown state.",
    closeOnContentClick: "Sets dropdown content on click behavior.",
    gradient: "Makes the button background color a gradient (only if `backgroundColor` prop is equal to `1`).",
    trigger: "Action that will triggered when open and close dropdown.",
    hoverOutTimeout: "Time in `ms` after mouse leave dropdown before it will be closed",
    hoverOverTimeout: "Time in `ms` after mouse enter dropdown before it will be opened",
    closeOnAnchorClick: "Dropdown will be closed when anchor is clicked",
    ariaLabel: "The aria-label of the component"
  },
  events: {
    click: "Emitted when user clicks on button.",
    mainButtonClick: "Emitted when user clicks on main button in split component."
  },
  methods: {},
  slots: {
    default: "Dropdown content slot.",
    label: "Content for dropdown button."
  }
});
