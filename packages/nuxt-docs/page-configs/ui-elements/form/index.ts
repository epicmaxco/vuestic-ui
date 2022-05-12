import { definePageConfig } from "~~/types/page-config";
import VaForm from "vuestic-ui/src/components/va-form/VaForm.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("form.title"),
    block.paragraph("form.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("WithInputs"),
    block.exampleBlock("Submit"),

    block.subtitle("all.api"),
    block.api(VaForm),
  ],
  manualApi: {
    methods: {
      validate: {
        types: "`() => boolean`",
      },
      focus: {
        types: "`() => void`",
      },
      focusInvalid: {
        types: "`() => void`",
      },
      resetValidation: {
        types: "`() => boolean`",
      },
      reset: {
        types: "`() => boolean`",
      },
    },
    events: {
      validation: {
        types: "`(valid: boolean) => void`",
      },
    },
  },
});
