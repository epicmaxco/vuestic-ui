import { userEvent } from './../../../.storybook/interaction-utils/userEvent'
import { StoryFn } from '@storybook/vue3'
import VaSelectDemo from './VaSelect.demo.vue'
import VaSelect from './VaSelect.vue'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'

export default {
  title: 'VaSelect',
  component: VaSelect,
}

export const OldDemos = () => ({
  components: { VaSelectDemo },
  template: '<VaSelectDemo />',
})

export const Default = () => ({
  components: { VaSelect },
  template: '<VaSelect/>',
})

export const Loading = () => ({
  components: { VaSelect },
  template: '<VaSelect loading />',
})

export const Validation: StoryFn = () => ({
  components: { VaSelect },

  data () {
    return { value: '', options: ['one', 'two', 'three'], rules: [(v: string) => (v && v === 'one') || 'Must be one'] }
  },

  template: '<VaSelect v-model="value" :options="options" :rules="rules" />',
})

Validation.play = async ({ canvasElement, step }) => {
  step('Expect no error when mounted even if value is incorrect', () => {
    const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
    expect(error).toBeNull()
  })
}

export const ImmediateValidation: StoryFn = () => ({
  components: { VaSelect },

  data () {
    return { value: '', options: ['one', 'two', 'three'], rules: [(v: string) => (v && v === 'one') || 'Must be one'] }
  },

  template: '<VaSelect v-model="value" :options="options" :rules="rules" immediate-validation />',
})

ImmediateValidation.play = async ({ canvasElement, step }) => {
  step('Expect error when mounted even if value is incorrect', () => {
    const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
    expect(error).not.toBeNull()
  })
}

export const DirtyValidation: StoryFn = () => ({
  components: { Component: VaSelect },

  data () {
    return { value: '', dirty: false, haveError: false, options: ['one', 'two', 'three'], rules: [(v: string) => (v && v === 'one') || 'Must be one'] }
  },

  template: `
  <p>[haveError]: {{ haveError }}</p>
  <p>[dirty]: {{ dirty }}</p>
  <Component v-model="value" v-model:dirty="dirty" v-model:error="haveError" :options="options" :rules="rules" clearable />
  <p> [controls] </p>
  <div>
    <button @click="value = 'two'" data-test="change">Change value to two</button>
  </div>
  `,
})

DirtyValidation.play = async ({ canvasElement, step }) => {
  step('Expect no error when mounted even if value is incorrect', () => {
    const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
    expect(error).toBeNull()
  })

  await step('Expect no error when value changed programaticaly', () => {
    userEvent.click(canvasElement.querySelector('[data-test="change"]')!)

    const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
    expect(error).toBeNull()
  })

  await step('Expect error appear when component is interacted', async () => {
    userEvent.click(canvasElement.querySelector('.va-input-wrapper__field')!)
    await sleep(1000)
    userEvent.click(document.body.querySelectorAll('.va-select-option')[1])
    await sleep(1000)
    const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
    expect(error).not.toBeNull()
  })
}

export const DirtyImmediateValidation: StoryFn = () => ({
  components: { Component: VaSelect },

  data () {
    return { value: '', dirty: false, haveError: false, options: ['one', 'two', 'three'], rules: [(v: string) => (v && v === 'one') || 'Must be one'] }
  },

  template: `
  <p>[haveError]: {{ haveError }}</p>
  <p>[dirty]: {{ dirty }}</p>
  <Component v-model="value" v-model:dirty="dirty" v-model:error="haveError" :options="options" :rules="rules" clearable immediate-validation />
  <p> [controls] </p>
  <div>
    <button @click="value = 'two'">Change value to two</button>
  </div>
  `,
})

DirtyImmediateValidation.play = async ({ canvasElement, step }) => {
  step('Expect error when mounted if value is incorrect', () => {
    const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
    expect(error).not.toBeNull()
  })
}

export const Autocomplete: StoryFn = () => ({
  components: { VaSelect },

  data () {
    // Test if initial value is correctly set
    return { value: 'one', options: ['one', 'two', 'three'] }
  },

  template: '<VaSelect v-model="value" :options="options" autocomplete />',
})

export const AutocompleteMultiple: StoryFn = () => ({
  components: { VaSelect },

  data () {
    return { value: ['one', 'two'], options: ['one', 'two', 'three'] }
  },

  template: '<VaSelect v-model="value" :options="options" autocomplete multiple />',
})

export const NilValue = () => ({
  components: { VaSelect },
  data () {
    return {
      value: null,
      options: [
        { text: 'Null', value: null },
        { text: 'Empty String', value: '' },
        { text: 'Undefined', value: undefined },
        { text: 'Zero', value: 0 },
      ],
    }
  },
  template: '[value]: {{ value }} <br /> <VaSelect v-model="value" :options="options" placeholder="Please select value" value-by="value" />',
})

export const ContentSlot: StoryFn = () => ({
  components: { VaSelect },

  data () {
    return { value: '', options: ['one', 'two', 'three'] }
  },

  template: `
  <VaSelect v-model="value" :options="options">
    <template #content="{ value }">
      {{ value }} Content slot
    </template>
  </VaSelect>`,
})

export const OptionSlot: StoryFn = () => ({
  components: { VaSelect },

  data () {
    return { value: '', options: ['one', 'two', 'three'] }
  },

  template: `
  <VaSelect v-model="value" :options="options">
    <template #option="{ option, index, selectOption }">
      <div @click="selectOption(option)">{{ option }} - Custom ({{ index }})</div>
    </template>
  </VaSelect>`,
})

export const OptionContentSlot: StoryFn = () => ({
  components: { VaSelect },

  data () {
    return { value: '', options: ['one', 'two', 'three'] }
  },

  template: `
  <VaSelect v-model="value" :options="options">
    <template #option-content="{ option, index }">
      <div>{{ option }} - Custom ({{ index }})</div>
    </template>
  </VaSelect>`,
})
