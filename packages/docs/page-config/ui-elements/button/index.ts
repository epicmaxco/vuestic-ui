import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("button.title"),
    block.paragraph("button.summaryText"),

    block.component("Playground"),

    block.subtitle("all.examples"),
    block.example("Default"),
    block.example("Presets"),
    block.example("WithColor"),
    block.example("WithGradient"),
    block.example("WithTextColor"),
    block.example("WithSize"),
    block.example("WithRound"),
    block.example("WithOutline"),
    block.example("WithIcon"),
    block.example("WithLoading"),
    block.example("Behavior"),
    block.example("Disabled"),
    block.example("Tag"),

    block.subtitle("all.api"),
    block.api("VaButton", apiOptions),
  ],
});
