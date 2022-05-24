import { definePageConfig } from "~~/types/page-config";
import VaOptionList from "vuestic-ui/src/components/va-option-list/VaOptionList.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("optionList.title"),
    block.paragraph("optionList.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("WithRadio"),
    block.exampleBlock("WithSwitch"),
    block.exampleBlock("WithComplexData"),

    block.subtitle("all.api"),
    block.api(VaOptionList),
  ],
  manualApi: {
    events: {
      input: { types: "`(value: String | Object) => void`" },
    },
    slots: {
      default: {},
    },
  },
});
