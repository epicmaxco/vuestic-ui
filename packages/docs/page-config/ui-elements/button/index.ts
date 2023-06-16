import apiOptions from "./api-options";
import apiDescription from "./api-description";

export default definePageConfig({
  blocks: [
    block.title("Button"),
    block.paragraph("The `va-button` component replaces the standard HTML button. It offers multiple built-in style presets and allows user to change different attributes (size, color, opacity etc.) manually."),

    block.component("Playground"),

    block.subtitle("Examples"),
    block.example("Default", {
      title: "Default",
      description: "Just a simple button."
    }),
    block.example("Presets", {
      title: "Presets",
      description: "The `preset` prop is used to change the build-in style of the component."
    }),
    block.example("WithColor", {
      title: "Colors",
      description: "The `color` prop is used to change the color of the component."
    }),
    block.example("WithGradient", {
      title: "Gradient",
      description: "Used to apply a gradient style to a background (only if `backgroundOpacity` prop is equals `1`)."
    }),
    block.example("WithTextColor", {
      title: "Text colors",
      description: "The `description-color` prop is used to change the color of the button description."
    }),
    block.example("WithSize", {
      title: "Sizes",
      description: "The `size` prop is used to fit your button to any place on your web page."
    }),
    block.example("WithRound", {
      title: "Rounded",
      description: "You can make your button rounded using `round` prop."
    }),
    block.example("WithOutline", {
      title: "Outlined",
      description: "You can make the button outlined using prop `border-color`."
    }),
    block.example("WithIcon", {
      title: "Add icons",
      description: "You can add icons to `va-button` with 2 different props: `icon` and `icon-right`. Also you can specify color for them via `icon-color` prop."
    }),
    block.example("WithLoading", {
      title: "Loading state",
      description: "You can add loading state to the button."
    }),
    block.example("Behavior", {
      title: "Behavior",
      description: "You can change hover or pressed behavior of the button via `hover`/`pressedBehavior`, `hover`/`pressedMaskColor` and `hover`/`pressedOpacity` props."
    }),
    block.example("Disabled", {
      title: "Disabled",
      description: "The `disabled` prop prevents any actions with button."
    }),
    block.example("Tag", {
      title: "Tag",
      description: "You can change the tag of the button wrapper to any other necessary one. However, we recommend to use other properties. For example, if the `href` property is set, then `button` will be replaced with `a`, and if the value of the `to` property is passed, the button tag will automatically change to `router-link`."
    }),

    block.subtitle("API"),
    block.api("VaButton", apiDescription, apiOptions),
  ],
});
