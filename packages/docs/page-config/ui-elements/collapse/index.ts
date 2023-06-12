import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Collapse"),

    block.paragraph("Toggles the visibility of content."),

    block.subtitle("Examples"),

    // examples
    block.example("Default", {
      title: "Default",
      description: "Default usage  of the `va-collapse` component."
    }),

    block.example("Solid", {
      title: "Solid",
      description: "Add borders to your collapse component by using the `solid` property."
    }),

    block.example("Icon", {
      title: "Icon",
      description: "You can add an icon to the header."
    }),

    block.example("Color", {
      title: "Color",
      description: "Use two color schemes."
    }),

    block.example("Flat", { title: "Flat" }),

    block.api("VaCollapse", apiDescription, apiOptions),
  ],
});
