import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    title: "Text content to place in the title",
    message: "Content of modal body",
    attachElement: "A valid selector of element, where modal will be rendered",
    disableAttachment: "Ignore `attach-element` prop and render component as it's parent child",
    size: "Set the size of the modal's width. `\"small\"`, `\"medium\"` (default) or `\"large\"`",
    okText: "Text string to place in the default footer **Ok** button",
    cancelText: "Text string to place in the default footer **Cancel** button",
    hideDefaultActions: "Use `hide-default-actions: true` to hide **Cancel** and **Ok** buttons",
    fullscreen: "Add the `fullscreen` prop to cover the whole page",
    mobileFullscreen: "Use `mobile-fullscreen: false` to disable fullscreen mode for mobile viewports",
    noDismiss: "Disable both close on overlay click and close on **Esc**",
    noOutsideDismiss: "Disable close on overlay click",
    noEscDismiss: "Disable close on **Esc**",
    maxWidth: "Use `max-width` to change the maximum width of the modal.",
    maxHeight: "Use `max-height` to change the maximum height of the modal. If content is larger, scroll will appear",
    fixedLayout: "Use `fixed-layout: true` to scroll only content in modal. Title and actions will be fixed",
    withoutTransitions: "Use `without-transitions: true` to turn off the open and close animations on the modal",
    overlay: "Use `overlay: false` to hide the overlay",
    overlayOpacity: "Set the overlay's opacity",
    anchorClass: "Set class name to the `anchor` slot container",
    zIndex: "Set the modal's `z-index`",
    allowBodyScroll: "Allows the document scroll while modal is open.",
    blur: "Use `blur` filter to overlay. Root `css` variable `--va-modal-overlay-background-blur-radius` sets the blur radius",
    ariaCloseLabel: "The aria-label of the close button",
    backgroundColor: "The background color of the modal dialog",
    beforeClose: "Function run before closing the modal",
    noPadding: "Disable padding in the modal dialog",
    onBeforeClose: "Function to be called before closing",
    onBeforeOpen: "Function to be called before opening",
    onCancel: "Function to be called after cancel button is been pressed",
    onClickOutside: "Function to be called after clicking outside the modal",
    onClose: "Function to be called after closing",
    onOk: "Function to be called after pressing the \"ok\" button",
    onOpen: "Function to be called after opening the modal"
  },
  events: {
    updateModelValue: "The event is triggered when the component needs to change visibility",
    clickOutside: "Emits when overlay is clicked",
    ok: "Emits when **Ok** button is clicked",
    beforeOpen: "Emits before modal's open after transition started",
    open: "Emits when modal's is open and transition is complete",
    beforeClose: "Emits before modal's start closing after transition started",
    close: "Emits when modal's is closed and transition is complete",
    cancel: "Emits when the user closes the modal window without side effects"
  },
  methods: {
    hide: "Hide modal (change `modelValue`)",
    show: "Show modal (change `modelValue`)",
    toggle: "Toggle a modal's visibility (change `modelValue`)"
  },
  slots: {
    default: "Content of modal body",
    anchor: "Modal anchor content. There is access to the `show`, `hide` and `toggle` methods in the slots scope",
    header: "Modal header content",
    footer: "Modal footer content"
  }
});
