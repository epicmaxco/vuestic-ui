import { definePageConfig } from "~~/types/page-config";

const { title, subtitle } = useDocsBlocks(import.meta)

export default definePageConfig({
  blocks: [
    title('alert.title'),
    subtitle('landing.preview.buttons.start')
  ],
  meta: {
    category: "view"
  },
  manualApi: {
    events: {
      input: {
        types: '(value: boolean) => void',
      },
    },
    methods: {
      hide: {
        types: '() => void',
      },
    },
    slots: {
      default: { },
      title: { },
      icon: { },
      close: { },
    },
  }
}) 