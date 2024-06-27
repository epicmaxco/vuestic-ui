import { defineComponent } from 'vue'
import VaFileUpload from './VaFileUpload.vue'
import VaFileUploadDemo from './VaFileUpload.demo.vue'
import { defineStory } from '../../../.storybook/types'

export default {
  title: 'VaFileUpload',
  component: VaFileUpload,
}

export const Default = () => defineComponent({
  components: { VaFileUploadDemo },
  template: '<VaFileUploadDemo/>',
})

export const FileType = defineStory({
  story: () => ({
    components: { VaFileUpload },
    template: '<VaFileUpload file-types="jpg,png" />',
  }),
})

export const MultipleFile = defineStory({
  story: () => ({
    components: { VaFileUpload },
    data () { return { files: [] } },
    template: `
      {{ files }}
      <VaFileUpload v-model="files" multiple />
    `,
  }),
})
