import { definePageConfig } from "~~/types/page-config";
import VaCheckbox from "vuestic-ui/src/components/va-checkbox/VaCheckbox.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("checkbox.title"),
    block.paragraph("checkbox.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Label"),

    block.subtitle("checkbox.examples.indeterminate.title", 'h5'),
    block.example("Indeterminate"),

    block.subtitle("checkbox.examples.coloring.title", 'h5'),
    block.example("Coloring"),

    block.exampleBlock("Array"),
    block.exampleBlock("Error"),

    block.subtitle("all.api"),
    block.api(VaCheckbox),
  ],
  manualApi: {
    events: {
      input: {
        types: "(event: Event) => void",
      },
    },
  },
});
