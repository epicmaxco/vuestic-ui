import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("config.title"),
    block.paragraph("config.description"),
    block.link("config.link", "/services/components-config"),

    block.subtitle("all.examples"),

    block.example("Default"),

    block.subtitle("all.api"),
    block.api("VaConfig", apiOptions),
  ],
});
