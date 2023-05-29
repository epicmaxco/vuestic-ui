import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("affix.title"),
    block.paragraph("affix.summaryText"),

    block.subtitle("Examples"),
    block.example("Top"),
    block.example("Bottom"),
    block.example("Default"),

    block.subtitle("API"),
    block.api("VaAffix", apiOptions),
  ],
});
