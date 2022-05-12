import { definePageConfig } from "~~/types/page-config";
import VaDivider from "vuestic-ui/src/components/va-divider/VaDivider.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("divider.title"),
    block.paragraph("divider.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("CustomContent"),
    block.exampleBlock("Vertical"),
    block.exampleBlock("Inset"),
    block.exampleBlock("Dashed"),
    block.exampleBlock("WithList"),

    block.subtitle("all.api"),
    block.api(VaDivider),
  ],
  manualApi: {
    slots: {
      default: {},
    },
  },
});
