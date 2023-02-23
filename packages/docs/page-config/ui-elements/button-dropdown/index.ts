import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("buttonDropdown.title"),
    block.paragraph("buttonDropdown.summaryText"),

    block.component("Playground"),

    block.subtitle("all.examples"),
    block.example("Default"),
    block.example("Split"),
    block.example("Colors"),
    block.example("Sizes"),
    block.example("Presets"),
    block.example("Disabled"),
    block.example("Icons"),
    block.example("ClickInside"),

    block.subtitle("all.api"),
    block.api("VaButtonDropdown", apiOptions),
  ],
});
