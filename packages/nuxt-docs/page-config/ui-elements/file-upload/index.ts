import apiOptions from "./api-options";

export default definePageConfig({
  blocks: [
    block.title("fileUpload.title"),
    block.paragraph("fileUpload.summaryText"),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("DragAndDrop"),
    block.example("Validation"),
    block.example("Gallery"),
    block.example("Slots"),
    block.example("Undo"),
    block.example("Disabled"),

    block.subtitle("all.api"),
    block.api("VaFileUpload", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-file-upload/_variables.scss"),
  ],
});
