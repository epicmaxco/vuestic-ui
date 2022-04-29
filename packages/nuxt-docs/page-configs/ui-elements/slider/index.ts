import { definePageConfig } from "~~/types/page-config";
import VaSlider from "vuestic-ui/src/components/va-slider/VaSlider.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("slider.title"),
    block.paragraph("slider.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Color"),
    block.exampleBlock("MinMax"),
    block.exampleBlock("State"),
    block.exampleBlock("Range"),
    block.exampleBlock("Step"),
    block.exampleBlock("Pins"),
    block.exampleBlock("Label"),
    block.exampleBlock("Slots"),
    block.exampleBlock("Icon"),
    block.exampleBlock("Track"),
    block.exampleBlock("TrackLabel"),
    block.exampleBlock("Vertical"),

    block.subtitle("all.api"),
    block.api(VaSlider),
  ],
  manualApi: {
    events: {
      dragStart: {
        types: "",
      },
      dragEnd: {
        types: "",
      },
      change: {
        types: "`Number | [Number, Number]`",
      },
      input: {
        types: "`Number | [Number, Number]`",
      },
    },
    slots: {
      append: {},
      prepend: {},
      label: {},
      trackLabel: {},
    },
  },
});
