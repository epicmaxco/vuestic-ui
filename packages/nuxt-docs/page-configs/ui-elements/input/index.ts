import { definePageConfig } from "~~/types/page-config";
import VaInput from "vuestic-ui/src/components/va-input/VaInput.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("input.title"),
    block.paragraph("input.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Default"),
    block.exampleBlock("Styles"),
    block.exampleBlock("Hint"),
    block.exampleBlock("Validate"),
    block.exampleBlock("Slots"),
    block.exampleBlock("Textarea"),
    block.exampleBlock("Mask"),

    block.subtitle("all.api"),
    block.api(VaInput),
  ],
  manualApi: {
    events: {
      change: {
        types: "any",
      },
      blur: {
        types: "FocusEvent",
      },
      focus: {
        types: "FocusEvent",
      },
      click: {
        types: "Event",
      },
      clickIcon: {
        types: "Event",
      },
      clickPrepend: {
        types: "Event",
      },
      clickPrependInner: {
        types: "Event",
      },
      clickAppend: {
        types: "Event",
      },
      clickAppendInner: {
        types: "Event",
      },
      keyup: {
        types: "Event",
      },
      keydown: {
        types: "Event",
      },
      updateError: {
        types: "() => boolean",
      },
      updateErrorMessages: {
        types: "() => string[] | string",
      },
    },
    methods: {
      focus: {
        types: "() => void",
      },
      blur: {
        types: "() => void",
      },
      reset: {
        types: "() => void",
      },
    },
    slots: {
      prepend: {},
      prependInner: {},
      append: {},
      appendInner: {},
    },
  },
});
