import { definePageConfig } from "~~/types/page-config";
import VaImage from "vuestic-ui/src/components/va-image/VaImage.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("image.title"),
    block.paragraph("image.summaryText"),

    block.subtitle("all.examples"),

    block.subtitle("image.examples.default.title", 'h5'),
    block.example("Default"),

    block.exampleBlock("Ratio"),

    block.exampleBlock("Contain"),
    block.exampleBlock("DefaultSlot"),
    block.exampleBlock("LoaderSlot"),
    block.exampleBlock("ErrorSlot"),

    block.subtitle("all.api"),
    block.api(VaImage),
  ],
  manualApi: {
    events: {
      loaded: {
        types: "Boolean",
      },
      error: {
        types: "Boolean",
      },
    },
    slots: {
      loading: {},
      error: {},
      default: {},
    },
  },
});
