import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("affix.title"),
    block.paragraph("affix.summaryText"),

    block.subtitle("all.examples"),
    block.example("Top"),
    block.example("Bottom"),
    block.example("Default"),

    block.subtitle("all.api"),
    block.api("VaAffix", apiOptions),
  ],
});
