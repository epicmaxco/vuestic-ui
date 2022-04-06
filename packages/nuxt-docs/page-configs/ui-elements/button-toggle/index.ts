import { definePageConfig } from "~~/types/page-config";
import VaButtonToggle from "vuestic-ui/src/components/va-button-toggle/VaButtonToggle.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("buttonToggle.title"),
    block.paragraph("buttonToggle.summaryText"),

    block.subtitle("all.examples"),
    block.exampleBlock("Default"),
    block.exampleBlock("Colors"),
    block.exampleBlock("ToggleColor"),
    block.exampleBlock("Gradient"),
    block.exampleBlock("Sizes"),
    block.exampleBlock("Styles"),
    block.exampleBlock("Disabled"),

    block.subtitle("all.api"),
    block.api(VaButtonToggle),
  ],
  manualApi: {
    events: {
      input: {
        types: "(value: any) => void",
      },
    },
  },
});
