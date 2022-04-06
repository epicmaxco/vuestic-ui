import { definePageConfig } from "~~/types/page-config";
import VaBacktop from "vuestic-ui/src/components/va-backtop/VaBacktop.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("backtop.title"),
    block.paragraph("backtop.summaryText"),

    block.subtitle("all.examples"),
    block.exampleBlock("Default"),

    block.subtitle("all.api"),
    block.api(VaBacktop),
  ],
  manualApi: {
    events: {
      click: {
        types: "Event",
      },
    },
    methods: {},
    slots: {
      default: {},
    },
  },
});
