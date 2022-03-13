import { definePageConfig } from "~~/types/page-config";

const { title, subtitle, example } = useDocsBlocks(import.meta)

export default definePageConfig({
  blocks: [
    title('button.title'),
    subtitle('landing.preview.buttons.start'),
    example('Default')
  ],
  meta: {
    category: "view"
  },
  manualApi: {
    slots: {
      default: { },
    },
    events: {
      click: { types: '`() => Event`' },
    },
    methods: {
      focus: { types: '`() => void`' },
      blur: { types: '`() => void`' },
    },
  }
}) 