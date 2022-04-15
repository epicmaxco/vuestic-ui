import { definePageConfig } from "~~/types/page-config";
import VaCard from "vuestic-ui/src/components/va-card/VaCard.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("card.title"),
    block.paragraph("card.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),

    block.subtitle("card.examples.colorAndGradient.title"),
    block.example("ColorAndGradient"),

    block.exampleBlock("Tag"),

    block.subtitle("card.examples.borderAndShape.title"),
    block.example("BorderAndShape"),

    block.subtitle("card.examples.disabled.title"),
    block.example("Disabled"),

    block.subtitle("card.examples.link.title"),
    block.example("Link"),

    block.subtitle("card.examples.stripe.title"),
    block.example("Stripe"),

    block.subtitle("card.examples.image.title"),
    block.example("Image"),

    block.subtitle("card.examples.actions.title"),
    block.paragraph("card.examples.actions.purpose"),
    block.paragraph("card.examples.actions.props"),
    block.paragraph("card.examples.actions.values"),
    block.example("Actions"),

    block.subtitle("all.api"),
    block.api(VaCard),

    block.subtitle("all.faq"),
    block.subtitle("card.faq.questions[0].question"),
    block.paragraph("card.faq.questions[0].answer"),

    block.subtitle("card.faq.questions[1].question"),
    block.paragraph("card.faq.questions[1].answer"),
  ],
  manualApi: {
    events: {
      click: {
        types: "Event",
      },
    },
  },
});
