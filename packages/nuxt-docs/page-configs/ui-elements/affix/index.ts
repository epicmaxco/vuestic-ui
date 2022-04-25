import { definePageConfig } from "~~/types/page-config";
import VaAffix from "vuestic-ui/src/components/va-affix/VaAffix.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("affix.title"),
    block.paragraph("affix.summaryText"),

    block.subtitle("all.examples"),
    block.subtitle("affix.examples.top.title", 'h5'),
    block.example("Top"),

    block.subtitle("affix.examples.target.title", 'h5'),
    block.example("Target"),

    block.subtitle("affix.examples.bottom.title", 'h5'),
    block.example("Bottom"),

    block.subtitle("all.api"),
    block.api(VaAffix),
  ],
  manualApi: {
    events: {
      change: {
        types: "boolean",
      },
    },
  },
});
