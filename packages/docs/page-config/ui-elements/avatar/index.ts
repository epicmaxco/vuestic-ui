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

    block.example("GravatarIntegration"),

    block.example("WithIcon"),

    block.example("Color"),

    block.example("Size"),

    block.example("Square"),

    block.example("Loading"),

    block.example("WithBadge"),

    block.example("Group"),

    block.example("Accessibility"),
    block.list([
      "avatar.examples.accessibility.advice0",
      "avatar.examples.accessibility.advice1",
      "avatar.examples.accessibility.advice2",
    ]),

    block.subtitle("all.api"),
    block.api("VaAvatar", apiOptions),
  ],
});
