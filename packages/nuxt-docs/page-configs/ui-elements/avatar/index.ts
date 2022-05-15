import { definePageConfig } from "~~/types/page-config";
import VaAvatar from "vuestic-ui/src/components/va-avatar/VaAvatar.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("avatar.title"),
    block.paragraph("avatar.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.subtitle("avatar.examples.color.title", 'h5'),
    block.example("Color"),
    block.exampleBlock("Size"),
    block.exampleBlock("WithImage"),
    block.exampleBlock("WithIcon"),

    block.subtitle("all.api"),
    block.api(VaAvatar),
  ],
  manualApi: {
    slots: {
      default: {},
    },
  },
});
