import { definePageConfig } from "~~/types/page-config";
import VaNavbar from "vuestic-ui/src/components/va-navbar/VaNavbar.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("navbar.title"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Colors"),
    block.exampleBlock("Shape"),

    block.subtitle("all.api"),
    block.api(VaNavbar),
  ],
});
