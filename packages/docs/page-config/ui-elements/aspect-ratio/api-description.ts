import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    contentWidth: "Wrapper width, it's used with `content-height` to replace the `ratio` property.",
    contentHeight: "Wrapper height, it's used with `content-width` to replace the `ratio` property.",
    maxWidth: "Maximal component's width."
  }
});
