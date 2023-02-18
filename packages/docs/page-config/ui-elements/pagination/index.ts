import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("pagination.title"),
    block.paragraph("pagination.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("LimitVisible"),
    block.example("Presets"),
    block.example("Colors"),
    block.example("Gapped"),
    block.example("Sizes"),
    block.example("Bordered"),
    block.example("Rounded"),
    block.example("ActiveColor"),
    block.example("Icons"),
    block.example("WithInput"),
    block.example("TotalAndPageSize"),
    block.example("PrevAndNextLinks"),

    block.subtitle("all.api"),
    block.api("VaPagination", apiOptions),

    block.subtitle("all.faq"),

    block.headline("pagination.faq.questions[0].question"),
    block.paragraph("pagination.faq.questions[0].answer"),

    block.headline("pagination.faq.questions[1].question"),
    block.paragraph("pagination.faq.questions[1].answer"),
  ],
});
