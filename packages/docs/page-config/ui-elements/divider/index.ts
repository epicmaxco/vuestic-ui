import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Divider"),
    block.paragraph("The `va-divider` component is used to separate sections of lists or layouts."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Simple divider",
      description: "Dividers in their simplest form display a horizontal line."
    }),
    block.example("CustomContent", {
      title: "Custom content",
      description: "You can customize the content on the divider line. Also you can set position of the content by setting the `orientation` property to `left`, `center` or `right`."
    }),
    block.example("Vertical", {
      title: "Vertical divider",
      description: "Add the `vertical` attribute in order to set whether or not the divider is vertically-oriented."
    }),
    block.example("Inset", {
      title: "Inset divider",
      description: "Add the `inset` attribute in order to set whether or not the divider is an inset divider."
    }),
    block.example("Dashed", {
      title: "Dashed divider",
      description: "Add the `dashed` attribute in order to set whether or not the divider line is dashed."
    }),
    block.example("WithList", {
      title: "Divider with lists",
      description: "Dividers perfectly work with `va-list`."
    }),

    block.subtitle('Accessibility'),
    block.paragraph('Has a [role=\"separator\"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role)[[target=_blank]]. Its attribute [aria-orientation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation)[[target=_blank]] depends on `vertical` property. Completely ignored by screen readers because of [aria-hidden=\"true\"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden)[[target=_blank]] attribute.'),

    block.subtitle("API"),
    block.api("VaDivider", apiDescription, apiOptions),
  ],
});
