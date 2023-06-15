import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    icon: "The icon to be displayed to the left of the title.",
    gradient: "Makes the button background color a gradient (only if `backgroundColor` prop is equal to `1`).",
    href: "Will be used as value for html `href` attribute (if used, `<button />` will be replaced with `<a>` tag).",
    target: "Will be used as value for html `target` attribute.",
    block: "Applies block styling (will take 100% of container width)."
  },
  slots: {
    default: "Default slot for button's content.",
    append: "Slot to input before button's content. Slot scope properties available: `{ '{ icon, iconAttributes }' }`.",
    prepend: "Slot to input after button's content. Slot scope properties available: `{ '{ icon, iconAttributes }' }`.",
    loading: "Slot for loading state. Slot scope properties available: `{ '{ icon, iconAttributes }' }`."
  },
  events: {
    click: "Emitted when user clicks on button"
  },
  methods: {
    focus: "Sets focus on button",
    blur: "Removes focus from button"
  }
});;
