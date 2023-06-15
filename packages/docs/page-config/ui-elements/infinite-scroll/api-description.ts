import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    offset: "Number of pixels to the end of `va-infinite-scroll` container at which the component should start loading more content in advance.",
    reverse: "Instead of bottom, top of the container would trigger loading.",
    disabled: "Won't trigger load even when scroll reached end. Useful to prevent further loading when there is no more items in list.",
    scrollTarget: "The element to be used as a scroll container instead of default one. Could be CSS selector or Element. When not set - direct wrapper will be used as a scroll container.",
    debounce: "Debounce to be applied when listening to scroll event. Useful to prevent user from triggering loading multiple times.",
    load: "Function that loads data. Should return Promise",
    tag: "Replaces html tag. This is useful for semantics and also to allow for valid markup in some cases (`ul > li` and `tr > td` etc.)."
  },
  events: {
    onload: "Emits when `load` function finished with success",
    onerror: "Emits when `load` function thrown error"
  },
  slots: {
    loading: "Shown when content is fetching.",
    default: "The content to be scrolled"
  }
});
