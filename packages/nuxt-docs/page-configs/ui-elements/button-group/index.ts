import { definePageConfig } from "~~/types/page-config";
import VaButtonGroup from "vuestic-ui/src/components/va-button-group/VaButtonGroup.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("buttonGroup.title"),
    block.paragraph("buttonGroup.summaryText"),

    block.subtitle("all.examples"),
    block.exampleBlock("Default"),
    block.exampleBlock("Colors"),
    block.exampleBlock("Gradient"),
    block.exampleBlock("Sizes"),
    block.exampleBlock("Styles"),
    block.exampleBlock("Icons"),

    block.subtitle("all.api"),
    block.api(VaButtonGroup),
  ],
  manualApi: {
    slots: {
      default: {},
    },
  },
});
