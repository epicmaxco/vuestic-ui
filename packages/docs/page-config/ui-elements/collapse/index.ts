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

    block.subtitle("Accessibility"),
    block.paragraph("The component itself has a role [button](https://w3c.github.io/aria/#button)[[target=_blank]] for header, and role [heading](https://w3c.github.io/aria/#heading)[[target=_blank]] for each header's wrapping element. The header's attribute [aria-expand](https://w3c.github.io/aria/#aria-expanded)[[target=_blank]] is set to `true` when its content is visible, and to `false` when the content is invisible. Header also has [aria-controls](https://w3c.github.io/aria/#aria-controls)[[target=_blank]] to identify element contents that are being controlled. [aria-disabled](https://w3c.github.io/aria/#aria-disabled)[[target=_blank]] depends on `disabled` property."),

    block.api("VaCollapse", apiDescription, apiOptions),
  ],
});
