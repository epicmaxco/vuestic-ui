import { definePageConfig } from "~~/types/page-config";
import VaParallax from "vuestic-ui/src/components/va-parallax/VaParallax.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("parallax.title"),
    block.paragraph("parallax.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Custom"),
    block.exampleBlock("Reversed"),
    block.exampleBlock("Slot"),

    block.subtitle("all.api"),
    block.api(VaParallax),
  ],
  manualApi: {
    events: {},
    methods: {},
    slots: {
      default: {},
    },
  },
});
