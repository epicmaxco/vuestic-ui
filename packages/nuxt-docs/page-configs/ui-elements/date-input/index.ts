import { definePageConfig } from "~~/types/page-config";
import VaDateInput from "vuestic-ui/src/components/va-date-input/VaDateInput.vue";
import GlobalConfigCode from './code-examples/global-config'

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("dateInput.title"),
    block.paragraph("dateInput.description"),

    block.link("datePicker.title", "/ui-elements/date-picker"),
    block.link("input.title", "/ui-elements/input"),

    block.subtitle("all.examples"),

    // examples
    block.exampleBlock("default"),

    block.exampleBlock("resetOnClose"),

    block.exampleBlock("isOpen"),

    block.exampleBlock("inputProps"),

    block.exampleBlock("formatting"),

    block.exampleBlock("input"),

    block.exampleBlock("advancedFormatting"),

    block.paragraph("dateInput.examples.formattingGlobalConfig.text"),
    block.code(GlobalConfigCode),

    block.subtitle("all.api"),
    block.api(VaDateInput),
  ],
  // Inherit props and slots from VaInput
});
