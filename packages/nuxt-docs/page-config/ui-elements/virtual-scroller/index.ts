import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("virtualScroller.title"),
    block.paragraph("virtualScroller.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),

    block.example("Horizontal"),

    block.example("Bench"),

    block.example("CustomKey"),

    block.example("ItemSize"),

    block.example("DifferentContent"),

    block.subtitle("all.api"),
    block.api("VaVirtualScroller", apiOptions),
  ],
});
