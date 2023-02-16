import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("accordion.title"),
    block.paragraph("accordion.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),

    block.example("Multiple"),

    block.example("Inset"),

    block.example("Popout"),

    block.example("Flat"),

    block.example("Menu"),

    block.subtitle("all.api"),
    block.api("VaAccordion", apiOptions),
  ],
});
