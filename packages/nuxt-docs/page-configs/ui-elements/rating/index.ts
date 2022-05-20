import { definePageConfig } from "~~/types/page-config";
import VaRating from "vuestic-ui/src/components/va-rating/VaRating.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("rating.title"),
    block.paragraph("rating.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Color"),
    block.exampleBlock("Size"),
    block.exampleBlock("Hover"),
    block.exampleBlock("Halves"),
    block.exampleBlock("Numbers"),
    block.exampleBlock("Texts"),
    block.exampleBlock("Clearable"),
    block.exampleBlock("CustomIcons"),

    block.subtitle("all.api"),
    block.api(VaRating),

    block.subtitle("all.faq"),

    block.subtitle("rating.faq.questions[0].question"),
    block.paragraph("rating.faq.questions[0].answer"),

    block.subtitle("rating.faq.questions[1].question"),
    block.paragraph("rating.faq.questions[1].answer"),
  ],
  manualApi: {
    events: {
      input: {
        types: "`(value: number) => void`",
      },
    },
  },
});
