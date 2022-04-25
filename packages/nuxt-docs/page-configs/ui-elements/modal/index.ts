import { definePageConfig } from "~~/types/page-config";
import VaModal from "vuestic-ui/src/components/va-modal/VaModal.vue";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("modal.title"),
    block.paragraph("modal.summaryText"),

    block.subtitle("all.examples"),

    block.exampleBlock("Overview"),
    block.exampleBlock("Stateful"),
    block.exampleBlock("Fullscreen"),

    block.subtitle("modal.examples.toggleVisibility.title", 'h5'),
    block.paragraph("modal.examples.toggleVisibility.text"),
    block.subtitle("modal.examples.toggleVisibility.sections[0].title", 'h5'),
    block.paragraph("modal.examples.toggleVisibility.sections[0].text"),
    block.subtitle("modal.examples.toggleVisibility.sections[1].title", 'h5'),
    block.paragraph("modal.examples.toggleVisibility.sections[1].text"),
    block.example("toggle-visibility/InstanceMethods"),

    block.exampleBlock("DisableAnimation"),
    block.exampleBlock("ModalSizing"),
    block.exampleBlock("HidingOverlay"),
    block.exampleBlock("ScrollingLongContent"),
    block.exampleBlock("Customization"),
    block.exampleBlock("NestedModals"),

    block.subtitle("all.api"),
    block.api(VaModal),
  ],
  manualApi: {
    events: {
      clickOutside: {
        types: "() => void",
      },
      input: {
        types: "(value: boolean) => void",
      },
      ok: {
        types: "() => void",
      },
      cancel: {
        types: "() => void",
      },
      beforeOpen: {
        types: "() => HTMLElement",
      },
      open: {
        types: "() => HTMLElement",
      },
      beforeClose: {
        types: "() => HTMLElement",
      },
      close: {
        types: "() => HTMLElement",
      },
    },
    methods: {
      hide: {
        types: "() => void",
      },
      open: {
        types: "() => void",
      },
      toggle: {
        types: "() => void",
      },
    },
    slots: {
      default: {},
      header: {},
      footer: {},
    },
  },
});
