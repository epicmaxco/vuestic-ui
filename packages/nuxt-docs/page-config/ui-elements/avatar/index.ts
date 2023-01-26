import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("avatar.title"),
    block.paragraph("avatar.summaryText"),

    block.component("Playground"),

    block.subtitle("all.examples"),

    block.example("Default"),

    block.example("WithImage"),

    block.example("Fallback"),

    block.example("WithIcon"),

    block.example("Color"),

    block.example("Size"),

    block.example("Square"),

    block.example("Loading"),

    block.example("WithBadge"),

    block.example("Group"),

    block.subtitle("all.api"),
    block.api("VaAvatar", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-avatar/_variables.scss"),
  ],
});
