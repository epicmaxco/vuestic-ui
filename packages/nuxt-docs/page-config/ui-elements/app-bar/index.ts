import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("appBar.title"),
    block.paragraph("appBar.summaryText"),
    block.subtitle("all.examples"),
    block.headline("appBar.examples.default.title"),
    block.paragraph("appBar.examples.default.text"),
    block.example("Default"),
    block.headline("appBar.examples.color.title"),
    block.paragraph("appBar.examples.color.text"),
    block.example("Color"),
    block.headline("appBar.examples.fixed.title"),
    block.paragraph("appBar.examples.fixed.text"),
    block.example("Fixed"),
    block.headline("appBar.examples.hide.title"),
    block.paragraph("appBar.examples.hide.text"),
    block.example("Hide"),
    block.headline("appBar.examples.shadow.title"),
    block.paragraph("appBar.examples.shadow.text"),
    block.example("Shadow"),

    block.subtitle("all.api"),
    block.api("VaAppBar", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-app-bar/_variables.scss"),
  ],
});
