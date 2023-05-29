import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("appBar.title"),
    block.paragraph("appBar.summaryText"),
    block.subtitle("Examples"),
    block.example("Default"),
    block.example("Color"),
    block.example("Fixed"),
    block.example("Hide"),
    block.example("Shadow"),

    block.subtitle("API"),
    block.api("VaAppBar", apiOptions),
  ],
});
