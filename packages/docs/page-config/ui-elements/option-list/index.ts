import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Option List"),
    block.paragraph("The `va-option-list` component is a component to be used to group form inputs (like checkboxes and radio buttons) into a list for better control over the data."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "By default `va-option-list` will render list of checkboxes provided by `options` prop"
    }),
    block.example("WithRadio", {
      title: "Radio",
      description: "Set `type=\"radio\"` to display list radio buttons"
    }),
    block.example("WithSwitch", {
      title: "Switch",
      description: "Set `type=\"switch\"` to display list switches"
    }),
    block.example("WithComplexData", {
      title: "Array of objects",
      description: "Instead of array of strings you can provide array of objects and specify which key is for each setting."
    }),

    block.subtitle("API"),
    block.api("VaOptionList", apiDescription, apiOptions),
  ],
});
