import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("hover.title"),
    block.paragraph("hover.summaryText"),

    block.subtitle("Examples"),

    block.example("VModel"),
    block.example("Slot"),
    block.example("Disabled"),

    block.subtitle("API"),
    block.api("VaHover", apiOptions),

    block.subtitle("FAQ"),
    block.headline("hover.faq.questions[0].question"),
    block.paragraph("hover.faq.questions[0].answer"),
  ],
});
