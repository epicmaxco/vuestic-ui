import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("card.title"),
    block.paragraph("card.summaryText"),

    block.subtitle("Examples"),

    block.example("Default"),
    block.example("ColorAndGradient"),
    block.example("Tag"),
    block.example("BorderAndShape"),
    block.example("Disabled"),
    block.example("Link"),
    block.example("Stripe"),
    block.example("Image"),
    block.example("Horizontal"),

    block.headline("card.examples.actions.title"),
    block.paragraph("card.examples.actions.purpose"),
    block.paragraph("card.examples.actions.props"),
    block.paragraph("card.examples.actions.values"),
    block.example("Actions", { hideTitle: true }),

    block.subtitle("API"),
    block.api("VaCard", apiOptions),

    block.subtitle("FAQ"),
    block.headline("card.faq.questions[0].question"),
    block.paragraph("card.faq.questions[0].answer"),

    block.headline("card.faq.questions[1].question"),
    block.paragraph("card.faq.questions[1].answer"),
  ],
});
