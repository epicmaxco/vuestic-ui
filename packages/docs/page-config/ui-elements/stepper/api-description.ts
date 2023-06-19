import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    modelValue: "Value of current step starting from `0`.",
    steps: "Array of step configs. `Label` is text displayed under each step in timeline, `Icon` if set, replaces step icon with specified icon, `disabled` makes step inaccessible without removing it from the timeline.",
    navigationDisabled: "Disables navigation via pressing on steps.",
    nextDisabled: "Disables navigation to steps further than `model-value`.",
    controlsHidden: "Removes 'Back' and 'Next' buttons.",
    vertical: "Changes stepper orientation to vertical.",
    finishButtonHidden: "Hides 'Finish' button",
    ariaLabel: "The aria-label of the component"
  },
  events: {
    finish: "Emits when 'Finish' button is getting pressed"
  },
  slots: {
    stepButton: "Replaces the step in timeline with provided template. Step slots are enumerable and should be used with step number postfix (i.e. step-button-0, step-button-1, etc). Slot scope properties and methods available: `{'{ setStep, nextStep, prevStep, step, isActive, isCompleted }'}`.",
    stepContent: "Replaces step content with provided template. Content slots are enumerable and should be used with step number postfix (i.e. step-content-0, step-content-1, etc). Slot scope properties and methods available: `{'{ setStep, nextStep, prevStep }'}`.",
    controls: "Inserts provided template after default controls. If you want to replace default controls set `controls-hidden` prop to `true`. Slot scope properties and methods available: `{'{ setStep, nextStep, prevStep }'}`.",
    divider: "Replaces step divider in the timeline with provided template."
  },
  methods: {
    setStep: "Activates step at specified index.",
    nextStep: "By default activates next step. If target step is disabled activates the step after it.",
    prevStep: "By default activates previous step. If target step is disabled activates the step before it."
  }
});
