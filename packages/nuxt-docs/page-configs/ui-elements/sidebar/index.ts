import { definePageConfig } from "~~/types/page-config";
import VaSidebar from "vuestic-ui/src/components/va-sidebar/VaSidebar.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("sidebar.title"),
    block.paragraph("sidebar.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Minimized"),
    block.exampleBlock("Width"),
    block.exampleBlock("MinimizedWidth"),
    block.exampleBlock("Color"),
    block.exampleBlock("Gradient"),
    block.exampleBlock("Position"),
    block.exampleBlock("Hoverable"),
    block.exampleBlock("VModel"),

    block.subtitle("all.api"),
    block.api(VaSidebar),

    block.subtitle("all.faq"),
    block.subtitle("sidebar.faq.questions[0].question"),
    block.paragraph("sidebar.faq.questions[0].answer"),
  ],
});
