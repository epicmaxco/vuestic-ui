import { ref } from 'vue'
import VaInputDemo from './VaInput.demo.vue'
import VaInput from './VaInput.vue'
import { expect } from '@storybook/jest'
import type { StoryFn } from '@storybook/vue3'

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
