import { definePageConfig } from "~~/types/page-config";
import VaSelect from "vuestic-ui/src/components/va-select/VaSelect.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("select.title"),
    block.paragraph("select.summaryText"),

    block.subtitle("all.examples"),

    block.subtitle("select.examples.default"),
    block.example("Default"),

    block.exampleBlock("Styles"),
    block.exampleBlock("Variations"),

    block.subtitle("select.examples.decorators.title"),
    block.example("Decorators"),

    block.subtitle("select.examples.objectOptions.title"),
    block.example("ObjectOptions"),

    block.exampleBlock("TrackBy"),

    block.subtitle("select.examples.slots.title"),
    block.paragraph("select.examples.slots.text[0]"),
    block.example("Slots"),
    block.paragraph("select.examples.slots.text[1]"),
    block.example("ContentSlot"),

    block.exampleBlock("State"),
    block.exampleBlock("Searchable"),
    block.exampleBlock("AllowCreate"),
    block.exampleBlock("Validation"),

    block.subtitle("select.examples.keyboardNavigation.title"),
    block.paragraph("select.examples.keyboardNavigation.moves"),
    block.paragraph("select.examples.keyboardNavigation.selects"),
    block.paragraph("select.examples.keyboardNavigation.hints"),

    block.subtitle("all.api"),
    block.api(VaSelect),
  ],
  manualApi: {
    events: {
      input: {
        types: "any",
      },
      clear: {
        types: "any",
      },
      updateSearch: {
        types: "any",
      },
      scrollBottom: {
        types: "any",
      },
    },
    methods: {
      reset: {
        types: "() => void",
      },
    },
    slots: {
      prepend: {},
      prependInner: {},
      append: {},
      appendInner: {},
      content: {},
    },
  },
});
