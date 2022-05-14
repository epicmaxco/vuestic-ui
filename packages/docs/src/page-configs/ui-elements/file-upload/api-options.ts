import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    input: {
      types: '`(value: number) => void`',
    },
    fileRemoved: {
      types: '`(file: VaFile) => void`',
    },
    fileAdded: {
      types: '`(files: VaFile[]) => void`',
    },
  },
})
