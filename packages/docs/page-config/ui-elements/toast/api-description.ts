import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    title: "Sets the title for the notification",
    offsetY: "Sets the Y offset",
    offsetX: "Sets the X offset",
    message: "Notification message",
    icon: "Sets the close icon",
    customClass: "Applies custom class to the component",
    duration: "Sets the duration of the notification display",
    closeable: "Provides the ability to close the component",
    onClose: "Applies a function to use when pressed a close button",
    onClick: "Applies a function to use when clicked",
    position: "Sets the position of the notification",
    render: "Render function to use a custom content",
    multiLine: "Sets more space for the Toast component",
    dangerouslyUseHtmlString: "Sets the ability to use `message` as innerHtml. **Please note that this can lead to XSS attacks**, so make sure that you sanitize the `message` by yourself",
    ariaCloseLabel: "The aria-label of the close button"
  },
  events: {
    onClick: "Emits when toast is clicked",
    onClose: "Emits when close button is clicked"
  },
});
