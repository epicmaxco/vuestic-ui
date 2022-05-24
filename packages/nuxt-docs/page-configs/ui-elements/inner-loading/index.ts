import { definePageConfig } from "~~/types/page-config";
import VaInnerLoading from "vuestic-ui/src/components/va-inner-loading/VaInnerLoading.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("innerLoading.title"),
    block.paragraph("innerLoading.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Color"),
    block.exampleBlock("Size"),
    block.exampleBlock("Icon"),

    block.subtitle("all.api"),
    block.api(VaInnerLoading),
  ],
  manualApi: {
    props: {},
    events: {},
    methods: {},
    slots: {
      default: {},
    },
  },
});
