import apiOptions from "./api-options";
import { methodsApi, optionsApi, apiExamplesObject } from "./toast-api";

export default definePageConfig({
  blocks: [
    block.title("toast.title"),
    block.paragraph("toast.summaryText"),
    block.paragraph("toast.optionsAPI"),
    block.paragraph("toast.compositionAPI"),
    block.code(apiExamplesObject),

    methodsApi(block),
    block.subtitle("toast.toastOptionsHeader"),
    optionsApi(block),

    block.subtitle("all.examples"),

    block.example("Default"),
    block.example("Color"),
    block.example("Offset"),
    block.example("Position"),
    block.example("Close"),
    block.example("Click"),

    block.subtitle("all.api"),
    block.api("VaToast", apiOptions),

    block.subtitle("all.cssVariables"),
    block.file("vuestic-ui/src/components/va-toast/_variables.scss"),

    block.subtitle("all.faq"),
    block.headline("toast.faq.questions[0].question"),
    block.paragraph("toast.faq.questions[0].answer"),
  ],
});
