import { definePageConfig } from "~~/types/page-config";
import VaRadio from "vuestic-ui/src/components/va-radio/VaRadio.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("radio.title"),
    block.paragraph("radio.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Color"),
    block.exampleBlock("CustomLabels"),
    block.exampleBlock("Disabled"),

    block.subtitle("all.api"),
    block.api(VaRadio),
  ],
});
