import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    value: "Hover state."
  },
  events: {
    input: "Emits hover state when it changes."
  },
  slots: {
    default: "Vue default slot."
  }
});
