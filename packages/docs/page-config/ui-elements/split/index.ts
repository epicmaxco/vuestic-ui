import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("split.title"),
    block.paragraph("split.summaryText"),

    block.subtitle("Examples"),

    block.example("Default"),

    block.example("Vertical"),

    block.example("CustomGrabber"),

    block.example("CustomLimits"),

    block.example("Snapping"),

    block.example("Nested"),

    block.example("Maximization"),

    block.example("Disabled"),

    block.subtitle("API"),
    block.api("VaSplit", apiOptions),
  ],
});
