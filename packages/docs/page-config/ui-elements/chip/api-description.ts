import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    closeable: "Provides the ability to close the tag",
    ariaCloseLabel: "The aria-label of close button",
    outline: "Applies outline styling",
    flat: "Applies flat styling",
    icon: "The icon to be displayed inside a tag",
    shadow: "Applies box-shadow to the component"
  },
});
