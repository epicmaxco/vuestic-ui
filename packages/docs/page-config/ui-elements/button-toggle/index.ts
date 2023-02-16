import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("buttonToggle.title"),
    block.paragraph("buttonToggle.summaryText"),

    block.component("Playground"),

    block.subtitle("all.examples"),
    block.example("Default"),
    block.example("Colors"),
    block.example("ToggleColor"),
    block.example("Gradient"),
    block.example("Sizes"),
    block.example("Styles"),
    block.example("Disabled"),
    block.example("Icons"),

    block.subtitle("all.api"),
    block.api("VaButtonToggle", apiOptions),
  ],
});
