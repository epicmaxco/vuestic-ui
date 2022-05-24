import { definePageConfig } from "~~/types/page-config";
import VaTabs from "vuestic-ui/src/components/va-tabs/VaTabs.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("tabs.title"),
    block.paragraph("tabs.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Pagination"),
    block.exampleBlock("Vertical"),
    block.exampleBlock("Color"),
    block.exampleBlock("Stateful"),

    block.subtitle("all.api"),
    block.api(VaTabs),

    block.subtitle("all.faq"),
    block.subtitle("tabs.faq.questions[0].question"),
    block.paragraph("tabs.faq.questions[0].answer"),
  ],
  manualApi: {
    events: {
      "click:next": {
        types: "`() => void`",
      },
      "click:prev": {
        types: "`() => void`",
      },
      "update:model-value": {
        types: "`() => number | string`",
      },
    },
    slots: {
      default: {},
      tabs: {},
    },
  },
});
