import VaInputDemo from './VaInput.demo.vue'
import VaInput from './VaInput.vue'
import { expect } from '@storybook/jest'
import type { StoryFn } from '@storybook/vue3'
import { defineStory } from '../../../.storybook/types'

export default {
  title: 'VaInput',
  component: VaInput,
  tags: ['autodocs'],
}

export const OldDemos = () => ({
  components: { VaInputDemo },
  template: '<VaInputDemo />',
})

export const Loading = () => ({
  components: { VaInput },
  template: '<VaInput loading />',
})

export const Stateful = () => ({
  components: { VaInput },
  template: '<VaInput stateful />',
})

export const Clearable = () => ({
  components: { VaInput },
  data () {
    return {
      value: 'test',
    }
  },
  template: '<VaInput clearable v-model="value" />',
})

export const LabelSlot = () => ({
  components: { VaInput },
  data: () => ({ value: 'test' }),
  template: `
    <VaInput clearable v-model="value">
      <template #label="bind">
        <span style="color: red">Custom label!</span>
      </template>
    </VaInput>
  `,
})

export const InnerLabelSlot = () => ({
  components: { VaInput },
  data: () => ({ value: 'test' }),
  template: `
    <VaInput clearable v-model="value" inner-label>
      <template #label="{ label }">
        <span style="color: red">Custom label!</span>
      </template>
    </VaInput>
  `,
})

export const MessagesSlot = () => ({
  components: { VaInput },
  data: () => ({ value: 'test' }),
  template: `
    <VaInput clearable v-model="value" :messages="['User message!']">
      <template #messages="{ messages }">
        <span style="color: red">{{ messages }}</span>
      </template>
    </VaInput>
  `,
})

export const MessageSlot = () => ({
  components: { VaInput },
  data: () => ({ value: 'test' }),
  template: `
    <VaInput clearable v-model="value" :messages="['User message!']">
      <template #message="{ message }">
        <span style="color: red">{{ message }}</span>
      </template>
    </VaInput>
  `,
})

export const Disabled: StoryFn = () => ({
  components: { VaInput },
  template: '<VaInput disabled/>',
})

export const Placeholder: StoryFn = () => ({
  components: { VaInput },
  template: '<VaInput placeholder="Placeholder"/>',
})

export const Autofocus: StoryFn = () => ({
  components: { VaInput },
  template: '<VaInput autofocus />',
})
Autofocus.play = async ({ canvasElement }) => {
  const input = canvasElement.querySelector('input')

  expect(input).toHaveFocus()
}

export const InputValue: StoryFn = () => ({
  components: { VaInput },
  data: () => ({ value: 't' }),
  // Must disallow writing more than 5 characters
  template: '<VaInput :model-value="value" @update:model-value="value = $event.slice(0, 5)" strictBindInputValue />',
})

export const InputValueComputed: StoryFn = () => ({
  components: { VaInput },
  data: () => ({ value: 't' }),

  computed: {
    valueComputed: {
      set (v) {
        this.value = v.slice(0, 5)
      },
      get () { return this.value },
    },
  },
  // Must disallow writing more than 5 characters
  template: '<VaInput v-model="valueComputed" strictBindInputValue />',
})

export const DebounceInput: StoryFn = () => ({
  components: { VaInput },
  data: () => ({ value: 't' }),
  methods: {
    onInput (text: string) {
      setTimeout(() => {
        this.value = text
      }, 1000)
    },
  },
  // Must disallow writing more than 2 characters
  template: '<VaInput stateful :model-value="value" @update:model-value="onInput" strictBindInputValue />',
})

export const ReactiveValidation = () => ({
  components: { VaInput },
  data () {
    return {
      v1: '3',
      v2: '2',
    }
  },
  template: `
  <VaInput v-model="v1"/>
  <VaInput v-model="v2" :rules="[() => v1 < v2 || 'V1 must be smaller V2']" immediate-validation />
  `,
})

export const Validation = defineStory({
  story: () => ({
    components: { VaInput },
    data () {
      return {
        value: '',
      }
    },
    template: `
      <VaInput v-model="value" :rules="[(v) => v.length > 1 || 'Min length is 2']" ref="component" />
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
    components: { VaInput },
    data () {
      return {
        value: '',
      }
    },
    template: `
      <VaInput v-model="value" :rules="[(v) => v.length > 1 || 'Min length is 2']" ref="component" immediate-validation />
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
    components: { VaInput },
    data () {
      return {
        value: '',
      }
    },
    template: `
      [isDirty]: {{ $refs.component?.isDirty }}
      <VaInput v-model="value" :rules="[(v) => v.length > 1 || 'Min length is 2']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    const hasErrorClass = () => canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') !== null

    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    step('Expect error when value entered', async (context) => {
      await event.type(canvasElement.querySelector('input')!, '1')

      expect(hasErrorClass()).toBe(true)

      expect(canvasElement.textContent).toContain('[isDirty]: true')

      await event.type(canvasElement.querySelector('input')!, '2')

      // Value satisfies the rule
      expect(hasErrorClass()).toBe(false)
    })
  },
})

export const ValidationTouchedState = defineStory({
  story: () => ({
    components: { VaInput },
    data () {
      return {
        value: '',
      }
    },
    template: `
      [isTouched]: {{ $refs.component?.isTouched }}
      <VaInput v-model="value" :rules="[(v) => v.length > 1 || 'Min length is 2']" ref="component" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep, methods }) {
    step('Expect error when input blur', async () => {
      await event.focus(canvasElement.querySelector('input')!)
      await event.blur(canvasElement.querySelector('input')!)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const ValidationClear = defineStory({
  story: () => ({
    components: { VaInput },
    data () {
      return {
        value: '',
      }
    },
    template: `
      <VaInput v-model="value" :rules="[ (value) => (value && value.length > 0) || 'Fill in the text box']" ref="component" clearable />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    await step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    await step('Expect error to be cleared when value is entered', async () => {
      await event.type(canvasElement.querySelector('input')!, '1')
      await event.type(canvasElement.querySelector('input')!, '{backspace}')

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })

    await step('Expect no error to be cleared when clear button is clicked', async () => {
      await event.type(canvasElement.querySelector('input')!, '1')
      await event.click(canvasElement.querySelector("[aria-label='reset']")!)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })
  },
})

export const ValidationClearWithImmediateValidation = defineStory({
  story: () => ({
    components: { VaInput },
    data () {
      return {
        value: '',
      }
    },
    template: `
      <VaInput v-model="value" :rules="[(value) => (value && value.length > 0) || 'Fill in the text box']" ref="component" immediate-validation clearable />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    await step('Expect error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })

    await step('Expect error to be cleared when value is entered', async () => {
      await event.type(canvasElement.querySelector('input')!, '1')
      await event.type(canvasElement.querySelector('input')!, '{backspace}')

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })

    await step('Expect no error to be cleared when clear button is clicked', async () => {
      await event.type(canvasElement.querySelector('input')!, '1')
      await event.click(canvasElement.querySelector("[aria-label='reset']")!)
      await sleep(1000)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})
