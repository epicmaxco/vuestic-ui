import { definePageConfig } from "~~/types/page-config";
import VaAlert from "vuestic-ui/src/components/va-alert/VaAlert.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("alert.title"),
    block.paragraph("alert.summaryText"),

    block.subtitle("all.examples"),
    block.exampleBlock("Default"),
    block.exampleBlock("Styles"),
    block.exampleBlock("Color"),
    block.exampleBlock("Border"),
    block.exampleBlock("Dense"),
    block.exampleBlock("Title"),
    block.exampleBlock("Icon"),
    block.exampleBlock("Closeable"),
    block.exampleBlock("Center"),

    block.subtitle("all.api"),
    block.api(VaAlert),
  ],
  manualApi: {
    events: {
      input: {
        types: "(value: boolean) => void",
      },
    },
    methods: {
      hide: {
        types: "() => void",
      },
    },
    slots: {
      default: {},
      title: {},
      icon: {},
      close: {},
    },
  },
});
