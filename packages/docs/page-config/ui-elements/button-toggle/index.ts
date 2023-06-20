import apiOptions from "./api-options";
import apiDescription from './api-description';

export default definePageConfig({
  blocks: [
    block.title("Button Toggle"),
    block.paragraph("The button is used to switch between different values."),

    block.component("Playground"),

    block.subtitle("Examples"),
    block.example("Default", {
      title: "Basic usage",
      description: "By default, an object with parameters and a v-model is to be passed."
    }),
    block.example("Colors", {
      title: "Colors",
      description: "Applies color presets and HEX colors."
    }),
    block.example("ToggleColor", {
      title: "Toggle color",
      description: "Use `toggle-color` prop to set the color of the active button."
    }),
    block.example("Gradient", {
      title: "Gradient",
      description: "Applies gradient style to background."
    }),
    block.example("Sizes", {
      title: "Sizes",
      description: "You can provide size presets to the component."
    }),
    block.example("Styles", {
      title: "Presets and styles",
      description: "You can use the same `preset`'s (`default`, `primary`, `secondary`, `plain`, `plainOpacity`) and styles (`round`, outline via `borderColor` property) as in [va-button](https://vuestic.dev/ui-elements/button)[[target=_blank]]."
    }),
    block.example("Disabled", {
      title: "Disabled",
      description: "The component can be disabled via `disabled` prop."
    }),
    block.example("Icons", {
      title: "Icons",
      description: "You can set icon instead (or in addition) of label for buttons via `options` props (`icon` and `iconRight` attributes)."
    }),

    block.subtitle("API"),
    block.api("VaButtonToggle", apiDescription, apiOptions),
  ],
});
