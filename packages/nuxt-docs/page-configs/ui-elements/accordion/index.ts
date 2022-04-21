import { definePageConfig } from "~~/types/page-config";
import VaAccordion from "vuestic-ui/src/components/va-accordion/VaAccordion.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("accordion.title"),
    block.paragraph("accordion.summaryText"),

    block.subtitle("all.examples"),
    block.subtitle("accordion.examples.default.title", 'h5'),
    block.paragraph("accordion.examples.default.text"),
    block.example("Default"),

    block.subtitle("accordion.examples.multiply.title", 'h5'),
    block.paragraph("accordion.examples.multiply.text"),
    block.example("Multiply"),

    block.subtitle("accordion.examples.inset.title", 'h5'),
    block.paragraph("accordion.examples.inset.text"),
    block.example("Inset"),

    block.subtitle("accordion.examples.popout.title", 'h5'),
    block.paragraph("accordion.examples.popout.text"),
    block.example("Popout"),

    block.subtitle("all.api"),
    block.api(VaAccordion),
  ],
  manualApi: {
    events: {
      input: {
        types: "(value: array) => void",
      },
    },
    slots: {
      default: {},
    },
  },
});
