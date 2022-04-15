import { definePageConfig } from "~~/types/page-config";
import VaSidebarItem from "vuestic-ui/src/components/va-sidebar/VaSidebarItem/VaSidebarItem.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("sidebarItem.title"),
    block.paragraph("sidebarItem.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Simple"),
    block.exampleBlock("Colors"),
    block.exampleBlock("Active"),
    block.exampleBlock("Icons"),
    block.exampleBlock("Components"),

    block.subtitle("all.api"),
    block.api(VaSidebarItem),
  ],
});
