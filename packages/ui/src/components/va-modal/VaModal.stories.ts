import { defineComponent } from 'vue'
import VaModal from './VaModal.vue'
import VaModalDemos from './VaModal.demo.vue'
import { StoryFn } from '@storybook/vue3'

export default {
  title: 'VaModal',
  component: VaModal,
}

export const OldDemos: StoryFn = () => ({
  components: { VaModalDemos },
  template: '<VaModalDemos/>',
})

export const CloseButton: StoryFn = () => ({
  components: { VaModal },
  template: `
    <button @click="$refs.modal.show()">
      show modal
    </button>
    <VaModal :model-value="true" ref="modal" :close-button="true">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    </VaModal>
  `,
})
