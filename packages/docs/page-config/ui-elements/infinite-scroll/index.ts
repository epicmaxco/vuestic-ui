import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("infiniteScroll.title"),
    block.paragraph("infiniteScroll.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Reverse"),
    block.example("Disabled"),
    block.example("CustomTarget"),

    block.subtitle("all.api"),
    block.api("VaInfiniteScroll", apiOptions),
  ],
});
