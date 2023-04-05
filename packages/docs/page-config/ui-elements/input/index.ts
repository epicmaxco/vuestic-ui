import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("input.title"),
    block.paragraph("input.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("ExtendedDefault"),
    block.example("HtmlAttributes"),
    block.example("Styles"),
    block.example("Hint"),
    block.example("Validate"),
    block.example("Slots"),
    block.example("Textarea"),
    block.example("Mask"),
    block.example("InputClass"),
    block.example("Customize"),

    block.headline("input.examples.types.title"),
    block.paragraph("input.examples.types.description[0]"),
    block.paragraph("input.examples.types.description[1]"),
    block.example("Types"),

    block.subtitle("all.api"),
    block.api("VaInput", apiOptions),

    // TODO: Move variable from VaInputWrapper to VaInput
    block.paragraph("VaInputWrapper:"),
    block.file(
      "vuestic-ui/src/components/va-input/components/VaInputWrapper/_variables.scss"
    ),
  ],
});
