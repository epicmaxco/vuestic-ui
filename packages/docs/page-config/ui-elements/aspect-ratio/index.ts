import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("aspectRatio.title"),
    block.paragraph("aspectRatio.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),

    block.example("WithOtherComponents"),

    block.subtitle("all.api"),
    block.api("VaAspectRatio", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-aspect-ratio/_variables.scss")
  ]
});
