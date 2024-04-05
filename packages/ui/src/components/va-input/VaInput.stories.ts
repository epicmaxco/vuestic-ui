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

export const Mask = () => ({
  components: { VaInput },
  data () {
    return {
      dateValue: '',
      dateValueRaw: '',
      creditCardValue: '',
      creditCardValueRaw: '',
    }
  },
  template: `
    [dateValue]: {{ dateValue }}
    [dateValueRaw]: {{ dateValueRaw }}
    <VaInput v-model="dateValue" @update:raw-value="value => dateValueRaw = value" mask="date" />

    [creditCardValue]: {{ creditCardValue }}
    [creditCardValueRaw]: {{ creditCardValueRaw }}
    <VaInput v-model="creditCardValue" @update:raw-value="value => creditCardValueRaw = value" mask="creditCard" />
  `,
})

export const MaskFormattedValue = () => ({
  components: { VaInput },
  data () {
    return {
      timeValue: '',
      dateValue: '',
      creditCardValue: '',
    }
  },
  template: `
    [dateValue]: {{ dateValue }}
    <VaInput v-model="dateValue" :mask="{
      type: 'date',
      options: { datePattern: ['m', 'y'] }
    }" :return-raw="false" />

    [timeValue]: {{ timeValue }}
    <VaInput v-model="timeValue" mask="time" :return-raw="false" />

    [creditCardValue]: {{ creditCardValue }}
    <VaInput v-model="creditCardValue" mask="creditCard" :return-raw="false" />
  `,
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
