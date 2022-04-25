import { definePageConfig } from "~~/types/page-config";
import VaAppBar from "vuestic-ui/src/components/va-app-bar/VaAppBar.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("appBar.title"),
    block.paragraph("appBar.summaryText"),
    block.subtitle("all.examples"),
    block.subtitle("appBar.examples.default.title", 'h5'),
    block.paragraph("appBar.examples.default.text"),
    block.example("Default"),
    block.subtitle("appBar.examples.color.title", 'h5'),
    block.paragraph("appBar.examples.color.text"),
    block.example("Color"),
    block.subtitle("appBar.examples.bottom.title", 'h5'),
    block.paragraph("appBar.examples.bottom.text"),
    block.example("Bottom"),
    block.subtitle("appBar.examples.hide.title", 'h5'),
    block.paragraph("appBar.examples.hide.text"),
    block.example("Hide"),
    block.subtitle("appBar.examples.shadow.title", 'h5'),
    block.paragraph("appBar.examples.shadow.text"),
    block.example("Shadow"),
    block.subtitle("all.api"),
    block.api(VaAppBar),
  ],
  manualApi: {
    slots: {
      default: {},
    },
  },
});
