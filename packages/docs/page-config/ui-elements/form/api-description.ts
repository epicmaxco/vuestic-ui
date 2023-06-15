import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    autofocus: "Focus on first form-component on render",
    hideErrorMessages: "Hide error messages for all form-components. Can be used if you want to display messages separately",
    hideErrors: "Do not highlight invalid form-components",
    hideLoading: "Do not show loading state for all form-components",
    immediate: "Validate form-components on mount. By default validation is performed on first user interaction with form-components",
    modelValue: "Used to indicate if form is valid or not. Can be used to disable submit button for example",
    stateful: "Makes all form-components stateful. By default form-components are stateless and you need to pass `v-model` to them to make them stateful"
  },
  events: {
    validation: "Triggered on validation update"
  },
  methods: {
    validate: "Performs validation and updates error state for each form component. Works with nested forms.",
    focus: "Focus on first focusable form-component in the form.",
    focusInvalid: "Focus on first focusable invalid form-component in the form. This is useful for longer forms and allows to bring user attention to invalid field.",
    resetValidation: "Reset validation for all validateable <!-- TODO Add link --> form-components.",
    reset: "Reset values and validation state for all form-components"
  }
});
