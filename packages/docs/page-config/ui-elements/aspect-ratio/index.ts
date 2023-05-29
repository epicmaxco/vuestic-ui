import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("aspectRatio.title"),
    block.paragraph("aspectRatio.summaryText"),

    block.subtitle("Examples"),

    block.example("Default"),

    block.example("WithOtherComponents"),

    block.subtitle("API"),
    block.api("VaAspectRatio", apiOptions),

      ]
});
