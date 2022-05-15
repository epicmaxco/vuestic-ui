import { definePageConfig } from "~~/types/page-config";
import VaColorPalette from "vuestic-ui/src/components/va-color-palette/VaColorPalette.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("colorPalette.title"),
    block.paragraph("colorPalette.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Indicator"),

    block.subtitle("all.api"),
    block.api(VaColorPalette),
  ],
});
