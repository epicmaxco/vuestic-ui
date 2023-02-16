import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("hover.title"),
    block.paragraph("hover.summaryText"),

    block.subtitle("all.examples"),

    block.example("VModel"),
    block.example("Slot"),
    block.example("Disabled"),

    block.subtitle("all.api"),
    block.api("VaHover", apiOptions),

    block.subtitle("all.faq"),
    block.headline("hover.faq.questions[0].question"),
    block.paragraph("hover.faq.questions[0].answer"),
  ],
});
