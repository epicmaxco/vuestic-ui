import { definePageConfig } from "~~/types/page-config";
import VaPagination from "vuestic-ui/src/components/va-pagination/VaPagination.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("pagination.title"),
    block.paragraph("pagination.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Colors"),
    block.exampleBlock("Sizes"),
    block.exampleBlock("LimitVisible"),
    block.exampleBlock("Icons"),
    block.exampleBlock("WithInput"),
    block.exampleBlock("TotalAndPageSize"),

    block.subtitle("all.api"),
    block.api(VaPagination),

    block.subtitle("all.faq"),

    block.subtitle("pagination.faq.questions[0].question"),
    block.paragraph("pagination.faq.questions[0].answer"),

    block.subtitle("pagination.faq.questions[1].question"),
    block.paragraph("pagination.faq.questions[1].answer"),
  ],
  manualApi: {
    events: {
      input: {
        types: "`(value: number) => void`",
      },
    },
  },
});
