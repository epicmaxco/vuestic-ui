import { definePageConfig } from "~~/types/page-config";
import VaTimeInput from "vuestic-ui/src/components/va-time-input/VaTimeInput.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("timeInput.title"),

    block.paragraph("timeInput.description"),
    block.link("timePicker.title", "/ui-elements/time-picker"),
    block.link("input.title", "/ui-elements/input"),

    block.subtitle("all.examples"),

    block.exampleBlock("default"),

    block.exampleBlock("format"),

    block.exampleBlock("input"),

    block.alert("timeInput.examples.input.notion", "primary"),

    block.exampleBlock("ampm"),

    block.exampleBlock("clearable"),

    block.exampleBlock("validation"),

    block.api(VaTimeInput),
  ],
});
