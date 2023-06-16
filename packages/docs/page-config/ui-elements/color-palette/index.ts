import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Color Palette"),
    block.paragraph("Palette component for color pick."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "By default use this component with `v-model` and palette array."
    }),
    block.example("Indicator", {
      title: "Indicator",
      description: "You can apply different styles to the indicator: `dot` and `square` are available. "
    }),

    block.subtitle("API"),
    block.api("VaColorPalette", {
      props: {
        value: "Current color",
        palette: "An array of colors",
        ariaIndicatorLabel: "The aria-label of the indicator",
        ariaLabel: "The aria-label of the component"
      },
    },  apiOptions),
  ],
});
