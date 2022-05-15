import { definePageConfig } from "~~/types/page-config";
import VaButtonDropdown from "vuestic-ui/src/components/va-button-dropdown/VaButtonDropdown.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("buttonDropdown.title"),
    block.paragraph("buttonDropdown.summaryText"),
    block.subtitle("all.examples"),
    block.exampleBlock("Default"),
    block.exampleBlock("Split"),
    block.exampleBlock("Colors"),
    block.exampleBlock("Sizes"),
    block.exampleBlock("Styles"),
    block.exampleBlock("Disabled"),
    block.exampleBlock("Icons"),
    block.exampleBlock("Events"),
    block.exampleBlock("ClickInside"),
    block.subtitle("all.api"),
    block.api(VaButtonDropdown),
  ],
  manualApi: {
    events: {
      click: { types: "`() => Event`" },
      mainButtonClick: { types: "`() => Event`" },
    },
    slots: {
      default: {},
    },
  },
});
