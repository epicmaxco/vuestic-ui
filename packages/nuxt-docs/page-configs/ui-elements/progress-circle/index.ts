import { definePageConfig } from "~~/types/page-config";
import VaProgressCircle from "vuestic-ui/src/components/va-progress-circle/VaProgressCircle.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("progressCircle.title"),
    block.paragraph("progressCircle.summaryText"),

    block.subtitle("all.examples"),
    block.exampleBlock("Default"),
    block.exampleBlock("Indeterminate"),
    block.exampleBlock("Coloring"),
    block.exampleBlock("Sizing"),
    block.exampleBlock("Slots"),
    block.exampleBlock("Thickness"),

    block.subtitle("all.api"),
    block.api(VaProgressCircle),
  ],
  manualApi: {
    slots: {
      default: {},
    },
  },
});
