import { definePageConfig } from "~~/types/page-config";
import VaCollapse from "vuestic-ui/src/components/va-collapse/VaCollapse.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("collapse.title"),

    block.paragraph("collapse.summaryText"),

    block.subtitle("all.examples"),

    // examples
    block.exampleBlock("Default"),

    block.exampleBlock("Solid"),

    block.exampleBlock("Icon"),

    block.exampleBlock("Color"),

    block.api(VaCollapse),
  ],
  manualApi: {
    events: {
      input: {
        types: "(value: boolean) => void",
      },
    },
    slots: {
      default: {},
      header: {},
    },
  },
});
