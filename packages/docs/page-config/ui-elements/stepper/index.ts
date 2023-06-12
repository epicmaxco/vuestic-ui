import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title('Stepper'),
    block.paragraph('Stepper allows users to separate content into several steps and navigate through it using buttons or timeline.'),

    block.subtitle('Examples'),

    block.example('Default', { title: "Basic usage" }),

    block.example('Vertical', { title: "Vertical" }),

    block.example('Icons', {
      title: "Custom icons",
      description: "Each step config could have icon name specified, check `va-icon` for more details."
    }),

    block.example('Custom', { title: "Customized with slots" }),

    block.alert('You can iterate through slots using template literals in slot name. \n Example: ``{\'#[`step-button-${i}`]=\"{ setStep, isActive, isCompleted }\"\'}``', 'info'),

    block.example('Minimal', {
      title: "Navigation only",
      description: "You can hide controls and use stepper navigation independently"
    }),

    block.subtitle('Accessibility'),

    block.paragraph('The component itself has a [role=\"group\"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role)[[target=_blank]] with aria attributes like an [aria-orientation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation)[[target=_blank]] attribute that depends on the `vertical` property. The current step element has the attribute [aria-current=\"step\"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current#values)[[target=_blank]]. Keyboard navigation for this component is based on the [w3 tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)[[target=_blank]].'),

    block.subtitle("API"),
    block.api("VaStepper", apiDescription, apiOptions),
  ],
});
