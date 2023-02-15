import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("rating.title"),
    block.paragraph("rating.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Color"),
    block.example("Size"),
    block.example("Hover"),
    block.example("Halves"),
    block.example("Numbers"),
    block.example("CustomIcons"),
    block.example("ItemSlot"),
    block.example("Texts"),
    block.example("Clearable"),

    block.subtitle("all.api"),
    block.api("VaRating", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-rating/_variables.scss"),

    block.subtitle("all.faq"),

    block.headline("rating.faq.questions[0].question"),
    block.paragraph("rating.faq.questions[0].answer"),

    block.headline("rating.faq.questions[1].question"),
    block.paragraph("rating.faq.questions[1].answer"),
  ],
});
