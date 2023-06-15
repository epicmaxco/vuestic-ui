import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    width: "Skeleton width.",
    height: "Skeleton height.",
    animation: "Skeleton animation. Can be `pulse`, `wave` or `none`.",
    variant: "Skeleton variant. Can be `squared`, `rounded`, `circle` or `text`.",
    lines: "Lines count if `variant` is `text`",
    lineGap: "Gap between lines in `px`, `rem`, `em` if `variant` is `text`",
    lastLineWidth: "Width of last line in `px`, `rem`, `em`, `%` if `variant` is `text`",
    tag: "Skeleton tag.",
    ariaLabel: "The aria-label of the component"
  }
});
