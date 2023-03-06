import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("backtop.title"),
    block.paragraph("backtop.summaryText"),

    block.subtitle("all.examples"),
    block.example("Default"),

    block.subtitle("all.api"),
    block.api("VaBacktop", apiOptions),
  ],
});
