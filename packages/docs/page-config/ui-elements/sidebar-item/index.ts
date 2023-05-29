import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("sidebarItem.title"),
    block.paragraph("sidebarItem.summaryText"),

    block.subtitle("Examples"),

    block.example("Simple"),
    block.example("Colors"),
    block.example("Active"),
    block.example("Icons"),
    block.example("Components"),

    block.subtitle("API"),
    block.api("VaSidebarItem", apiOptions),
  ],
});
