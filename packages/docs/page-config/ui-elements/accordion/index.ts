import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Accordion"),
    block.paragraph("Allows you to control group of [collapses](ui-elements/collapse)."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Default",
      description: "Default usage  of the `va-accordion` component."
    }),

    block.example("Multiple", {
      title: "Multiple",
      description: "Accordion component allows you to select multiple collapses."
    }),

    block.example("Inset", {
      title: "Inset",
      description: "Active collapse component becomes smaller."
    }),

    block.example("Popout", {
      title: "Popout",
      description: "Active collapse component becomes bigger."
    }),

    block.example("Flat", { title: "Flat" }),

    block.example("Menu", {
      title: "Menu",
      description: "One of the interesting ways to use the component is a collapsing menu."
    }),

    block.subtitle("API"),
    block.api("VaAccordion", apiDescription, apiOptions),
  ],
});
