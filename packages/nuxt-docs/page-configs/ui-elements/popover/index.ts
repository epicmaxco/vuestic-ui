import { definePageConfig } from "~~/types/page-config";
import VaPopover from "vuestic-ui/src/components/va-popover/VaPopover.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("popover.title"),
    block.paragraph("popover.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Color"),
    block.exampleBlock("Placement"),
    block.exampleBlock("Icon"),
    block.exampleBlock("Title"),
    block.exampleBlock("Trigger"),

    block.subtitle("all.api"),
    block.api(VaPopover),
  ],
});
