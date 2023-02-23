import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("tabs.title"),
    block.paragraph("tabs.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Pagination"),
    block.example("Vertical"),
    block.example("Color"),
    block.example("Stateful"),
    block.example("Content"),

    block.subtitle("all.api"),
    block.api("VaTabs", apiOptions),

        

    block.subtitle("all.faq"),
    block.headline("tabs.faq.questions[0].question"),
    block.paragraph("tabs.faq.questions[0].answer"),
  ],
});
