import { definePageConfig } from "~~/types/page-config";
import VaToast from "vuestic-ui/src/components/va-toast/VaToast.vue";
import optionsApiExample from './code-examples/options-api'
import compositionApiExample from "./code-examples/composition-api";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("toast.title"),
    block.paragraph("toast.summaryText"),
    block.paragraph("toast.optionsAPI"),
    block.code(optionsApiExample),

    block.paragraph("toast.compositionAPI"),
    block.code(compositionApiExample),

    // methodsApi(block),
    block.subtitle("toast.toastOptionsHeader"),
    // optionsApi(block),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Color"),
    block.exampleBlock("Offset"),
    block.exampleBlock("Position"),
    block.exampleBlock("Close"),
    block.exampleBlock("Click"),

    block.subtitle("all.api"),
    block.api(VaToast),

    block.subtitle("all.faq"),
    block.subtitle("toast.faq.questions[0].question"),
    block.paragraph("toast.faq.questions[0].answer"),
  ],
});
