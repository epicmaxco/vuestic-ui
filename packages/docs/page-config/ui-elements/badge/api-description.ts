import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    text: "Badge text.",
    overlap: "Allows badge to overlap with element.",
    transparent: "(Deprecated) Makes badge semi-transparent.",
    multiLine: "Badge text will wrap to next line.",
    visibleEmpty: "Badge will be shown even when there is no text.",
    dot: "Shows dot instead of full badge. Useful to notify user without grabbing too much attention.",
    placement: "Badge will be placed on `placement` side of the base element.",
    offset: "Moves badge relatively to main axis."
  }
});
