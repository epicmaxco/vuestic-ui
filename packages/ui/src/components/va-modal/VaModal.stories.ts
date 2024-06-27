import { h, ref } from 'vue'
import { VaModal } from './'
import VaModalDemos from './VaModal.demo.vue'
import { StoryFn } from '@storybook/vue3'
import { expect } from '@storybook/jest'
import { userEvent } from '../../../.storybook/interaction-utils/userEvent'

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
  data () {
    return {
      show: false,
    }
  },
  template: `
    <button @click="show = true">
      show modal
    </button>
    <VaModal :model-value="show" @cancel="show = false" :close-button="true">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    </VaModal>
  `,
})

export const focusTrap: StoryFn = () => ({
  components: { VaModal },

  data () {
    return {
      show: false,
    }
  },

  template: `
  <button @click="show = true">Focused button</button>
  <VaModal v-model="show">
    <input data-testid="input1" style="outline: 2px solid grey" />
    <input data-testid="input2" style="outline: 2px solid grey" />
    <input data-testid="input3" style="outline: 2px solid grey" />
  </VaModal>
  `,
})

focusTrap.play = async ({ canvasElement, step }) => {
  const showModalButton = canvasElement.querySelector('button')

  await userEvent.click(showModalButton!)

  const [input1, input2, input3] = Array.from(canvasElement.ownerDocument.querySelectorAll('input'))

  await step('Focus in modal after opened', async () => {
    const modal = canvasElement.ownerDocument.querySelector('.va-modal')

    await userEvent.tab()

    expect(modal?.contains(document.activeElement)).toBe(true)
  })

  await step('Item in input can be focused', async () => {
    await userEvent.focus(input2)

    expect(document.activeElement).toBe(input2)
  })

  // Notice we're not able to prevent programmatic focus from being out of focus trap
  // so we don't test it here, because userEvent.tab() will focus the next focusable element
  // programaticaly, not emulating user behavior
}

export const childProps: StoryFn = () => ({
  components: { VaModal },

  data () {
    return { color: '#f0f' }
  },

  setup () {
    const color = ref('#f0f')
    const textNode = h('div', { style: { color: 'red', fontSize: '18px' } }, 'Cancel')

    return { color, textNode }
  },

  template: `
  [[color]]: {{ color }}
  <VaModal :model-value="true" :child:cancel-button="{ 'slot:default': 'Text' }" :child:ok-button="{ preset: 'secondary' }">
    Content
  </VaModal>
  `,
})
