import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("divider.title"),
    block.paragraph("divider.summaryText"),

    block.subtitle("Examples"),

    block.example("Default"),
    block.example("CustomContent"),
    block.example("Vertical"),
    block.example("Inset"),
    block.example("Dashed"),
    block.example("WithList"),

    block.subtitle('Accessibility'),
    block.paragraph('divider.accessibility'),

    block.subtitle("API"),
    block.api("VaDivider", apiOptions),
  ],
});
