import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Color Input"),
    block.paragraph("Input component that allows you to select a color."),

    block.subtitle("Examples"),

    block.example("Default", {
      title: "Basic usage",
      description: "By default use this component with `v-model`."
    }),
    block.example("Disabled", {
      title: "Disabled",
      description: "All user interactions can be disabled."
    }),

    block.subtitle("API"),
    block.api("VaColorInput", {
      props: {
        value: "Current color.",
        selected: "Select the indicator.",
        ariaOpenColorPickerLabel: "The aria-label of \"open color picker\" button."
      },
    }, apiOptions),
  ],
});
