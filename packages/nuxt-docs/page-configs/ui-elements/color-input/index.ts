import { definePageConfig } from "~~/types/page-config";
import VaColorInput from "vuestic-ui/src/components/va-color-input/VaColorInput.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("colorInput.title"),
    block.paragraph("colorInput.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Disabled"),

    block.subtitle("all.api"),
    block.api(VaColorInput),
  ],
  manualApi: {
    events: {},
    methods: {},
    slots: {
      default: {},
    },
  },
});
