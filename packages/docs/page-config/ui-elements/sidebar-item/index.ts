import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("sidebarItem.title"),
    block.paragraph("sidebarItem.summaryText"),

    block.subtitle("all.examples"),

    block.example("Simple"),
    block.example("Colors"),
    block.example("Active"),
    block.example("Icons"),
    block.example("Components"),

    block.subtitle("all.api"),
    block.api("VaSidebarItem", apiOptions),
  ],
});
