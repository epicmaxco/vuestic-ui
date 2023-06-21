import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Chip"),
    block.paragraph("Chip - it is a compact element for displaying data or performing an action."),

    block.component('Playground'),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "Default usage of the `va-chip` component."
    }),
    block.example("Outline", {
      title: "Outline",
      description: "Outline style without background."
    }),
    block.example("Flat", {
      title: "Flat",
      description: "Flat style without borders and background."
    }),
    block.example("Square", {
      title: "Square",
      description: "Makes your `va-chip` square."
    }),
    block.example("Color", {
      title: "Color",
      description: "You can use the `va-chip` component with different colors."
    }),
    block.example("Size", {
      title: "Size",
      description: "Set different tag sizes using size presets."
    }),
    block.example("Icon", {
      title: "Icon",
      description: "You can use icons in tag."
    }),
    block.example("Closeable", {
      title: "Closeable",
      description: "A tag can be closed by applying the `closeable` property."
    }),
    block.example("Link", {
      title: "Link",
      description: "It makes your tag clickable."
    }),
    block.example("Shadow", {
      title: "Shadow",
      description: "You can set a shadow."
    }),

    block.subtitle("API"),
    block.api("VaChip", apiDescription, apiOptions),
  ],
});
