import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Skip Link"),
    block.paragraph("`va-skip-link` skip to the target component."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "By default, `va-skip-link` needs a target and position, please keep in mind that the component should be placed as the very first element."
    }),
    
    block.subtitle("API"),
    block.api("VaSkipLink", apiDescription, apiOptions),
  ],
});
