import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Radio"),
    block.paragraph("The `va-radio` allows the user to select one option from a set."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "Default usage  of the `va-radio` component."
    }),
    block.example("Color", {
      title: "Colors",
      description: "With `color` prop you can change the color of the component."
    }),
    block.example("CustomLabels", {
      title: "Custom Labels",
      description: "You can add a label text by setting the `label` property. To switch label side use `left-label` property."
    }),
    block.example("Disabled", {
      title: "Disabled",
      description: "With `disabled` prop you can disable a user interaction  with `va-radio` component."
    }),

    block.subtitle("API"),
    block.api("VaRadio", apiDescription, apiOptions),
  ],
});
