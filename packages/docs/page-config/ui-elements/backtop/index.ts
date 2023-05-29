import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("Backtop"),
    block.paragraph("backtop.summaryText"),

    block.subtitle("Examples"),
    block.example("Default"),

    block.subtitle("API"),
    block.api("VaBacktop", apiOptions),
  ],
});
