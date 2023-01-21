import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("card.title"),
    block.paragraph("card.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),

    block.headline("card.examples.colorAndGradient.title"),
    block.example("ColorAndGradient"),

    block.example("Tag"),

    block.headline("card.examples.borderAndShape.title"),
    block.example("BorderAndShape"),

    block.headline("card.examples.disabled.title"),
    block.example("Disabled"),

    block.headline("card.examples.link.title"),
    block.example("Link"),

    block.headline("card.examples.stripe.title"),
    block.example("Stripe"),

    block.headline("card.examples.image.title"),
    block.example("Image"),

    block.headline("card.examples.horizontal.title"),
    block.example("Horizontal"),

    block.headline("card.examples.actions.title"),
    block.paragraph("card.examples.actions.purpose"),
    block.paragraph("card.examples.actions.props"),
    block.paragraph("card.examples.actions.values"),
    block.example("Actions"),

    block.subtitle("all.api"),
    block.api("VaCard", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-card/_variables.scss"),

    block.subtitle("all.faq"),
    block.headline("card.faq.questions[0].question"),
    block.paragraph("card.faq.questions[0].answer"),

    block.headline("card.faq.questions[1].question"),
    block.paragraph("card.faq.questions[1].answer"),
  ],
});
