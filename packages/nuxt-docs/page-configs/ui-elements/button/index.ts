import { definePageConfig } from "~~/types/page-config";
import VaButton from 'vuestic-ui/src/components/va-button/VaButton.vue'

const { title, subtitle, exampleBlock, api } = useDocsBlocks(import.meta)

export default definePageConfig({
  blocks: [
    title('button.title'),
    subtitle('landing.preview.buttons.start'),
    exampleBlock('Default'),
    api(VaButton as any)
  ],
  meta: {
    category: "view"
  },
  manualApi: {
    slots: {
      default: { },
    },
    events: {
      click: { types: '() => Event' },
    },
    methods: {
      focus: { types: '() => void' },
      blur: { types: '() => void' },
    },
  }
}) 