import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Checkbox"),
    block.paragraph("Checkboxes allow the user to select multiple options from a set."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Standard",
      description: "Perfectly works with `v-model` by default."
    }),
    block.example("Label", {
      title: "Label",
      description: "You can add a label text by setting the `label` property. You can also set the `left-label` property to move your label on the left side of a checkbox."
    }),
    block.example("Indeterminate", {
      title: "Indeterminate"
    }),
    block.example("Coloring", {
      title: "Coloring"
    }),
    block.example("Array", {
      title: "Grouped (Array)",
      description: "Just add the same `v-model` to multiple checkboxes, and set the `array-value` prop."
    }),
    block.example("Error", {
      title: "Errors",
      description: "You can show your error messages while using `va-checkbox` with form."
    }),

    block.subtitle("API"),
    block.api("VaCheckbox", apiDescription, apiOptions),


    block.changeLog({
      '1.8.0': [
        'Checkbox have outlined style by default',
        'Add `preset="solid"`',
      ],
    })
  ],
});
