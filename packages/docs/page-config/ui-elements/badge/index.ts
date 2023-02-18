import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("badge.title"),
    block.paragraph("badge.summaryText"),

    block.component("Playground"),

    block.subtitle("all.examples"),
    block.example("Default"),

    block.example("Position"),

    block.example("Color"),

    block.example("Dot"),

    block.example("Overlap"),

    block.example("Transparent"),

    block.example("WithOtherComponents"),

    block.example("NoContent"),

    block.subtitle("all.api"),
    block.api("VaBadge", apiOptions),
  ],
});
