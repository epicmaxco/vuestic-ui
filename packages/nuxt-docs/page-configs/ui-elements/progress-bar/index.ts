import { definePageConfig } from "~~/types/page-config";
import VaProgressBar from "vuestic-ui/src/components/va-progress-bar/VaProgressBar.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("progressBar.title"),
    block.paragraph("progressBar.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Indeterminate"),
    block.exampleBlock("Coloring"),
    block.exampleBlock("Sizing"),
    block.exampleBlock("Slots"),
    block.exampleBlock("Buffer"),

    block.subtitle("all.api"),
    block.api(VaProgressBar),
  ],
  manualApi: {
    slots: {
      default: {},
    },
  },
});
