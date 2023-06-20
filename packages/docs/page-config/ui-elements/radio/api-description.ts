import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    value: "Model of the component",
    option: "Option value that model is updated to when an option is selected",
    tabindex: "Sets a custom tabindex"
  }
});
