import { definePageConfig } from "~~/types/page-config";
import VaSwitch from "vuestic-ui/src/components/va-switch/VaSwitch.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("switch.title"),
    block.paragraph("switch.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Color"),
    block.exampleBlock("Label"),
    block.exampleBlock("CustomLabel"),
    block.exampleBlock("InnerLabel"),
    block.exampleBlock("Size"),
    block.exampleBlock("State"),
    block.exampleBlock("Loading"),
    block.exampleBlock("CustomValue"),
    block.subtitle("switch.examples.indeterminate.title"),
    block.example("Indeterminate"),
    block.exampleBlock("Error"),

    block.subtitle("all.api"),
    block.api(VaSwitch),
  ],
  manualApi: {
    events: {
      blur: {
        types: "FocusEvent",
      },
      focus: {
        types: "FocusEvent",
      },
      input: {
        types: "any",
      },
    },
    slots: {
      default: {},
      innerLabel: {},
    },
  },
});
