import { definePageConfig } from "~~/types/page-config";
import VaHover from "vuestic-ui/src/components/va-hover/VaHover.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("hover.title"),
    block.paragraph("hover.summaryText"),

    block.subtitle("all.examples"),
    block.exampleBlock("VModel"),

    block.exampleBlock("Slot"),
    block.exampleBlock("Disabled"),

    block.subtitle("all.api"),
    block.api(VaHover),

    block.subtitle("all.faq"),
    block.subtitle("hover.faq.questions[0].question"),
    block.paragraph("hover.faq.questions[0].answer"),
  ],
  manualApi: {
    events: {
      input: {
        types: "Boolean",
      },
    },
    slots: {
      default: {},
    },
  },
});
