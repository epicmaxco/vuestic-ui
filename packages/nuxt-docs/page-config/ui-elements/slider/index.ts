import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("slider.title"),
    block.paragraph("slider.summaryText"),

    block.component("Playground"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Color"),
    block.example("MinMax"),
    block.example("State"),
    block.example("Range"),
    block.example("Step"),
    block.example("Pins"),
    block.example("Label"),
    block.example("Slots"),
    block.example("Icon"),
    block.example("Track"),
    block.example("TrackLabel"),
    block.example("Vertical"),

    block.subtitle("all.api"),
    block.api("VaSlider", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-slider/_variables.scss"),
  ],
});
