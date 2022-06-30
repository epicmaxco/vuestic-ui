import { definePageConfig } from "~~/types/page-config";
import VaChip from "vuestic-ui/src/components/va-chip/VaChip.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("chip.title"),
    block.paragraph("chip.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Outline"),
    block.exampleBlock("Flat"),
    block.exampleBlock("Square"),
    block.exampleBlock("Color"),
    block.exampleBlock("Size"),
    block.exampleBlock("Icon"),
    block.exampleBlock("Closeable"),
    block.exampleBlock("Link"),
    block.exampleBlock("Shadow"),

    block.subtitle("all.api"),
    block.api(VaChip),
  ],
});
