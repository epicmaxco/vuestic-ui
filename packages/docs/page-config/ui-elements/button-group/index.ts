import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Button Group"),
    block.paragraph("It is a special component that wrap buttons and applies special styles to them."),

    block.subtitle("Examples"),
    block.example("Default", {
      title: "Basic usage",
      description: "By default, you need to wrap your buttons with a `va-button-group` component."
    }),
    block.example("Colors", {
      title: "Colors",
      description: "Component provides color to each child button."
    }),
    block.example("Gradient", {
      title: "Gradient",
      description: "It’s used to apply a gradient style to a background."
    }),
    block.example("Sizes", {
      title: "Sizes",
      description: "You can set different sizes."
    }),
    block.example("Grow", {
      title: "Grow",
      description: "Makes button group grow to the width of its container."
    }),
    block.example("Styles", {
      title: "Presets & styles",
      description: "You can use the same `preset`'s (`default`, `primary`, `secondary`, `plain`, `plainOpacity`) and styles (`round`, outline via `borderColor` property) as in [va-button](https://vuestic.dev/ui-elements/button)[[target=_blank]]."
    }),
    block.example("Icons", {
      title: "Icons",
      description: "Looks good with icons provided to buttons. "
    }),

    block.subtitle("API"),
    block.api("VaButtonGroup", apiDescription, apiOptions),
  ],
});
