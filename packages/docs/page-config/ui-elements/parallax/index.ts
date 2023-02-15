import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("parallax.title"),
    block.paragraph("parallax.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Custom"),
    block.example("Reversed"),
    block.example("Slot"),

    block.subtitle("all.api"),
    block.api("VaParallax", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-parallax/_variables.scss"),
  ],
});
