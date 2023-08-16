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

    block.example("Menu", {
      title: "Menu",
      description: "One of the interesting ways to use the component is a collapsing menu."
    }),

    block.link("See example with VaSidebarItem", "/ui-elements/sidebar-item#advanced-case-with-va-accordion"),

    block.subtitle("Accessibility"),
    block.paragraph("Expand/collapse of accordion item in focus is dependent on `mutilple` prop, for other accessbility information see [VaCollapse accessibility section](/ui-elements/collapse#all-accessibility)[[target=_blank]]."),

    block.subtitle("API"),
    block.api("VaAccordion", apiDescription, apiOptions),

    block.changeLog({
      '1.8.0': [
        'Removed `flat` prop and changed default look to flat',
      ]
    })
  ],
});
