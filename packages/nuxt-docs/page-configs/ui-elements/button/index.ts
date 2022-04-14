import { definePageConfig } from "~~/types/page-config";
import VaButton from "vuestic-ui/src/components/va-button/VaButton.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("button.title"),
    block.paragraph("button.summaryText"),

    block.subtitle("all.examples"),
    block.exampleBlock("Default"),
    block.exampleBlock("WithColor"),
    block.exampleBlock("WithGradient"),
    block.exampleBlock("WithTextColor"),
    block.exampleBlock("WithSize"),
    block.exampleBlock("WithStyle"),
    block.exampleBlock("WithIcon"),
    block.exampleBlock("WithConfig"),
    block.exampleBlock("WithLoading"),
    block.exampleBlock("Disabled"),

    block.subtitle("all.api"),
    block.api(VaButton),
  ],
  manualApi: {
    slots: {
      default: {},
    },
    events: {
      click: { types: "() => Event" },
    },
    methods: {
      focus: { types: "() => void" },
      blur: { types: "() => void" },
    },
  },
});
