import { defineComponent, h, ref } from 'vue'
import { defineStory } from '../../../../.storybook/types'
import { useModal } from './useModal'
import ModalComponentContent from './stories/ModalComponentContent.vue'

export default {
  title: 'composables/useModal',
}

export const Default = defineStory({
  story: () => ({
    setup () {
      const { init } = useModal()

      return {
        init,
      }
    },

    template: `
      <button @click="init('Test')">Create</button>
    `,
  }),

  async tests ({ step, sleep, expect, canvasElement }) {
    await step('Show confirm on click', async () => {
      const button = canvasElement.querySelector('button')!
      button.click()

      await sleep(1000)

      expect(document.querySelector('.va-modal')).not.toBeNull()
    })

    await step('Hide on ok', async () => {
      const button = document.querySelector('.va-modal')!.querySelector('.va-modal_ok-button')! as HTMLButtonElement
      button.click()

      await sleep(1000)

      expect(document.querySelector('.va-modal')).toBeNull()
    })
  },
})

export const Confirm = defineStory({
  story: () => ({
    setup () {
      const { confirm } = useModal()
      const result = ref(null as boolean | null)

      const test = async () => {
        const response = await confirm('Test')
        result.value = response
      }

      return {
        result,
        confirm,
        test,
      }
    },

    template: `
      <div id="result">{{ result }}</div>
      <button @click="test">Create</button>
    `,
  }),

  async tests ({ step, sleep, expect, canvasElement }) {
    await step('Show confirm on click', async () => {
      const button = canvasElement.querySelector('button')!
      button.click()

      await sleep(1000)

      expect(canvasElement.querySelector('#result')?.innerHTML).toBe('')
      expect(document.querySelector('.va-modal')).not.toBeNull()
    })

    await step('Hide on ok', async () => {
      const button = document.querySelector('.va-modal')!.querySelector('.va-modal_ok-button')! as HTMLButtonElement
      button.click()

      await sleep(1000)

      expect(canvasElement.querySelector('#result')?.innerHTML).toBe('true')
      expect(document.querySelector('.va-modal')).toBeNull()
    })
  },
})

const component = defineComponent({
  template: '<div class="bg-red-100">Test Component</div>',
})

export const InitComponent = defineStory({
  story: () => ({
    setup () {
      const { confirm } = useModal()
      const result = ref(null as boolean | null)

      const test = async () => {
        const response = await confirm(ModalComponentContent)
        result.value = response
      }

      return {
        result,
        confirm,
        test,
      }
    },

    template: `
      <div id="result">{{ result }}</div>
      <button @click="test">Create</button>
    `,
  }),

  async tests ({ step, sleep, expect, canvasElement }) {
    await step('Show confirm on click', async () => {
      const button = canvasElement.querySelector('button')!
      button.click()

      await sleep(1000)

      expect(canvasElement.querySelector('#result')?.innerHTML).toBe('')
      expect(document.querySelector('.va-modal')).not.toBeNull()
      expect(document.querySelector('.va-modal .va-modal__message')?.innerHTML).toContain('Test Component')
    })

    await step('Hide on ok', async () => {
      const button = document.querySelector('.va-modal')!.querySelector('.va-modal_ok-button')! as HTMLButtonElement
      button.click()

      await sleep(1000)

      expect(canvasElement.querySelector('#result')?.innerHTML).toBe('true')
      expect(document.querySelector('.va-modal')).toBeNull()
    })
  },
})
