import { waitFor } from '@storybook/testing-library'
import { defineStory } from '../../../.storybook/types'
import VaTextareaDemo from './VaTextarea.demo.vue'
import VaTextarea from './VaTextarea.vue'

export default {
  title: 'VaTextarea',
  component: VaTextarea,
  tags: ['autodocs'],
}

export const OldDemos = () => ({
  components: { VaTextareaDemo },
  template: '<VaTextareaDemo />',
})

export const Default = () => ({
  components: { VaTextarea },
  template: '<VaTextarea />',
})

export const Solid = () => ({
  components: { VaTextarea },
  template: '<VaTextarea preset="solid" />',
})

export const Bordered = () => ({
  components: { VaTextarea },
  template: '<VaTextarea preset="bordered" />',
})

export const Loading = () => ({
  components: { VaTextarea },
  template: '<VaTextarea loading />',
})

export const Disabled = () => ({
  components: { VaTextarea },
  template: '<VaTextarea disabled />',
})

export const Readonly = () => ({
  components: { VaTextarea },
  template: '<VaTextarea readonly />',
})

export const Error = () => ({
  components: { VaTextarea },
  template: '<VaTextarea error />',
})

export const ErrorMessage = () => ({
  components: { VaTextarea },
  template: '<VaTextarea error :error-messages="[`Error message!`]" />',
})

export const Success = () => ({
  components: { VaTextarea },
  template: '<VaTextarea success />',
})

export const Autosize = () => ({
  components: { VaTextarea },
  data: () => ({ value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' }),
  template: '<VaTextarea autosize v-model="value" />',
})

export const MaxRows = () => ({
  components: { VaTextarea },
  data: () => ({ value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' }),
  template: '<VaTextarea max-rows="2" v-model="value" />',
})

export const MinRows = () => ({
  components: { VaTextarea },
  data: () => ({ value: 'Lorem Ipsum' }),
  template: '<VaTextarea min-rows="2" v-model="value" />',
})

export const Counter = () => ({
  components: { VaTextarea },
  data: () => ({ value: 'Lorem Ipsum' }),
  template: '<VaTextarea counter v-model="value" />',
})

export const CounterMaxLength = () => ({
  components: { VaTextarea },
  data: () => ({ value: 'Lorem Ipsum' }),
  template: '<VaTextarea counter :max-length="30" v-model="value" />',
})

export const CounterSlot = () => ({
  components: { VaTextarea },
  data: () => ({ value: 'Lorem Ipsum' }),
  template: `
  <VaTextarea counter :max-length="30" v-model="value">
    <template #counter="{ valueLength, maxLength }">
      Additional message, {{ \`\${valueLength}/\${maxLength}\` }}
    </template>
  </VaTextarea>
`,
})

export const CustomHeight = () => ({
  components: { VaTextarea },
  data: () => ({ value: 'Lorem Ipsum' }),
  template: '<VaTextarea style="height: 300px" :max-length="30" v-model="value" />',
})

export const Validation = defineStory({
  story: () => ({
    components: { VaTextarea },
    data () {
      return {
        value: '',
      }
    },
    template: `
      <VaTextarea v-model="value" :rules="[(v) => v.length > 1 || 'Min length is 2']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    step('Expect error when mounted even if value is incorrect', () => {
      // No error until value is entered
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })
  },
})

export const ValidationImmediate = defineStory({
  story: () => ({
    components: { VaTextarea },
    data () {
      return {
        value: '',
      }
    },
    template: `
      <VaTextarea v-model="value" :rules="[(v) => v.length > 1 || 'Min length is 2']" ref="component" immediate-validation />
    `,
  }),

  async tests ({ canvasElement, step, expect }) {
    step('Expect error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const ValidationDirtyState = defineStory({
  story: () => ({
    components: { VaTextarea },
    data () {
      return {
        value: '',
      }
    },
    template: `
      [isDirty]: {{ $refs.component?.isDirty }}
      <VaTextarea v-model="value" :rules="[(v) => v.length > 1 || 'Min length is 2']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    const hasErrorClass = () => canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') !== null

    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    step('Expect error when value entered', async (context) => {
      await event.type(canvasElement.querySelector('textarea')!, '1')

      expect(hasErrorClass()).toBe(true)

      expect(canvasElement.textContent).toContain('[isDirty]: true')

      await event.type(canvasElement.querySelector('textarea')!, '2')

      // Value satisfies the rule
      expect(hasErrorClass()).toBe(false)
    })
  },
})

export const ValidationTouchedState = defineStory({
  story: () => ({
    components: { VaTextarea },
    data () {
      return {
        value: '',
      }
    },
    template: `
      [isTouched]: {{ $refs.component?.isTouched }}
      <VaTextarea v-model="value" :rules="[(v) => v.length > 1 || 'Min length is 2']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep, methods }) {
    step('Expect error when input blur', async () => {
      await event.focus(canvasElement.querySelector('textarea')!)
      await event.blur(canvasElement.querySelector('textarea')!)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

// These assertions require a real browser (ResizeObserver and native layout).
export const AutosizeMaxRowsScrolling = defineStory({
  story: () => ({
    components: { VaTextarea },
    data: () => ({ value: 'First line' }),
    template: '<VaTextarea autosize :min-rows="2" :max-rows="3" v-model="value" />',
  }),
  async tests ({ canvasElement, step, expect, event }) {
    const textarea = canvasElement.querySelector('textarea')!

    await step('Grow to maxRows and allow vertical scrolling beyond the limit', async () => {
      await waitFor(() => expect(textarea.rows).toBe(2))
      const initialHeight = textarea.clientHeight
      await event.type(textarea, '{enter}Second{enter}Third{enter}Fourth{enter}Fifth{enter}Sixth')

      await waitFor(() => {
        expect(textarea.rows).toBe(3)
        expect(textarea.clientHeight).toBeGreaterThan(initialHeight)
        expect(textarea.scrollHeight).toBeGreaterThan(textarea.clientHeight)
        expect(getComputedStyle(textarea).overflowY).toBe('auto')
      })

      textarea.scrollTop = 0
      textarea.scrollTo({ top: textarea.scrollHeight })
      await waitFor(() => {
        expect(textarea.scrollTop).toBeGreaterThan(0)
        expect(Math.abs(textarea.scrollHeight - textarea.clientHeight - textarea.scrollTop)).toBeLessThanOrEqual(1)
      })
    })
  },
})

export const AutosizeWithoutMaxRows = defineStory({
  story: () => ({
    components: { VaTextarea },
    data: () => ({ value: 'First line' }),
    template: '<VaTextarea autosize :min-rows="2" v-model="value" />',
  }),
  async tests ({ canvasElement, step, expect, event }) {
    const textarea = canvasElement.querySelector('textarea')!

    await step('Keep growing without introducing vertical scrolling when maxRows is unset', async () => {
      await waitFor(() => expect(textarea.rows).toBe(2))
      const initialHeight = textarea.clientHeight
      await event.type(textarea, '{enter}Second{enter}Third{enter}Fourth{enter}Fifth{enter}Sixth')

      await waitFor(() => {
        expect(textarea.rows).toBeGreaterThan(3)
        expect(textarea.clientHeight).toBeGreaterThan(initialHeight)
        expect(textarea.scrollHeight).toBeLessThanOrEqual(textarea.clientHeight + 1)
        expect(textarea.style.overflowY).toBe('')
        expect(getComputedStyle(textarea).overflowY).toBe('hidden')
      })
    })
  },
})
