import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("appBar.title"),
    block.paragraph("appBar.summaryText"),
    block.subtitle("all.examples"),
    block.example("Default"),
    block.example("Color"),
    block.example("Fixed"),
    block.example("Hide"),
    block.example("Shadow"),

    block.subtitle("all.api"),
    block.api("VaAppBar", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-app-bar/_variables.scss"),
  ],
});
