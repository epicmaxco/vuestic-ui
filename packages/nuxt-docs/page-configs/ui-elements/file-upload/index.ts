import { definePageConfig } from "~~/types/page-config";
import VaFileUpload from "vuestic-ui/src/components/va-file-upload/VaFileUpload.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("fileUpload.title"),
    block.paragraph("fileUpload.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("DragAndDrop"),
    block.exampleBlock("Validation"),
    block.exampleBlock("Gallery"),

    block.subtitle("all.api"),
    block.api(VaFileUpload),
  ],
  manualApi: {
    events: {
      input: {
        types: "`(value: number) => void`",
      },
    },
  },
});
