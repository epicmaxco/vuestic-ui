import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("popover.title"),
    block.paragraph("popover.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Color"),
    block.example("Placement"),
    block.example("Icon"),
    block.example("Title"),
    block.example("Trigger"),
    block.example("Slots"),

    block.subtitle("all.api"),
    block.api("VaPopover", apiOptions),
  ],
});
