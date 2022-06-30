import { definePageConfig } from "~~/types/page-config";
import VaInfiniteScroll from "vuestic-ui/src/components/va-infinite-scroll/VaInfiniteScroll.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("infiniteScroll.title"),
    block.paragraph("infiniteScroll.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Reverse"),
    block.exampleBlock("Disabled"),
    block.exampleBlock("CustomTarget"),

    block.subtitle("all.api"),
    block.api(VaInfiniteScroll),
  ],
  manualApi: {
    props: {
      load: { types: "() => Promise<any>" },
    },
    slots: {
      loading: {},
      default: {},
    },
  },
});
