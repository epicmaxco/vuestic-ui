import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("form.title"),
    block.paragraph("form.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("WithInputs"),
    block.example("Submit"),

    block.subtitle("all.api"),
    block.api("VaForm", apiOptions),
  ],
});
