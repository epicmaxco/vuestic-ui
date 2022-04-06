import { definePageConfig } from "~~/types/page-config";
import VaIcon from "vuestic-ui/src/components/va-icon/VaIcon.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("icon.title"),
    block.paragraph("icon.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Color"),
    block.exampleBlock("Size"),
    block.exampleBlock("Rotation"),
    block.exampleBlock("Spin"),
    block.exampleBlock("Text"),
    block.exampleBlock("Tag"),

    block.subtitle("all.api"),
    block.api(VaIcon),
  ],
});
