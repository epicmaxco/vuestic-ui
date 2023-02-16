import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("divider.title"),
    block.paragraph("divider.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("CustomContent"),
    block.example("Vertical"),
    block.example("Inset"),
    block.example("Dashed"),
    block.example("WithList"),

    block.subtitle("all.api"),
    block.api("VaDivider", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-divider/_variables.scss"),
  ],
});
