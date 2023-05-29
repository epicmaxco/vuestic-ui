import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("infiniteScroll.title"),
    block.paragraph("infiniteScroll.summaryText"),

    block.subtitle("Examples"),

    block.example("Default"),
    block.example("Reverse"),
    block.example("Disabled"),
    block.example("CustomTarget"),

    block.subtitle("API"),
    block.api("VaInfiniteScroll", apiOptions),
  ],
});
