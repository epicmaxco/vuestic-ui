import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("progressBar.title"),
    block.paragraph("progressBar.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Indeterminate"),
    block.example("Coloring"),
    block.example("Sizing"),
    block.example("Slots"),
    block.example("Buffer"),
    block.example("Max"),

    block.subtitle("all.api"),
    block.api("VaProgressBar", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-progress-bar/_variables.scss"),
  ],
});
