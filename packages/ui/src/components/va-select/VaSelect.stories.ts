import { StoryFn } from '@storybook/vue3'
import VaSelectDemo from './VaSelect.demo.vue'
import VaSelect from './VaSelect.vue'
import { defineStory } from '../../../.storybook/types'

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

export const Placeholder: StoryFn = () => ({
  components: { VaSelect },

  data () {
    // Test if initial value is correctly set
    return { value: '', options: ['one', 'two', 'three'] }
  },

  template: '<VaSelect v-model="value" :options="options" placeholder="test" />',
})

export const Validation: StoryFn = defineStory({
  story: () => ({
    components: { VaSelect },

    data () {
      return { value: '', options: ['one', 'two', 'three'], rules: [(v: string) => (v && v === 'one') || 'Must be one'] }
    },

    template: '<VaSelect v-model="value" :options="options" :rules="rules" />',
  }),

  async tests ({ canvasElement, step, expect }) {
    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })
  },
})

export const ValidationImmediate = defineStory({
  story: () => ({
    components: { VaSelect },

    data () {
      return { value: '', options: ['one', 'two', 'three'], rules: [(v: string) => (v && v === 'one') || 'Must be one'] }
    },

    template: '<VaSelect v-model="value" :options="options" :rules="rules" immediate-validation />',
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
    components: { VaSelect },

    data () {
      return { value: '', options: ['one', 'two', 'three'], rules: [(v: string) => (v && v === 'one') || 'Must be one'] }
    },

    template: `
      <VaSelect v-model="value" :options="options" :rules="rules" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event }) {
    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    step('Expect error when opened and closed', async () => {
      await event.click(canvasElement.querySelector('.va-input-wrapper__field')!)
      await event.hover(document.body.querySelectorAll('.va-select-option')[2])
      await event.click(document.body.querySelectorAll('.va-select-option')[2])

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const ValidationTouchedState = defineStory({
  story: () => ({
    components: { VaSelect },

    data () {
      return { value: '', options: ['one', 'two', 'three'], rules: [(v: string) => (v && v === 'one') || 'Must be one'] }
    },

    methods: {
      reset () { this.$refs.select.reset() },
    },

    template: `
      <VaSelect v-model="value" :options="options" :rules="rules" ref="select" />
    `,
  }),

  async tests ({ canvasElement, step, expect, event, methods }) {
    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    step('Expect error when opened and closed', async () => {
      await event.click(canvasElement.querySelector('.va-input-wrapper__field')!)

      await event.hover(document.body.querySelectorAll('.va-select-option')[2])

      await event.click(document.body)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })

    step('Expect error when input blur', async () => {
      methods.reset()

      await event.focus(canvasElement.querySelector('.va-input-wrapper__field')!)
      await event.blur(canvasElement.querySelector('.va-input-wrapper__field')!)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const DirtyValidation = defineStory({
  story: () => ({
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
  }),

  async tests ({ canvasElement, step, expect, event, sleep }) {
    step('Expect no error when mounted even if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    await step('Expect no error when value changed programaticaly', () => {
      event.click(canvasElement.querySelector('[data-test="change"]')!)

      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).toBeNull()
    })

    await step('Expect error appear when component is interacted', async () => {
      event.click(canvasElement.querySelector('.va-input-wrapper__field')!)
      await sleep(1000)
      event.click(document.body.querySelectorAll('.va-select-option')[1])
      await sleep(1000)
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const DirtyImmediateValidation = defineStory({
  story: () => ({
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
  }),

  async tests ({ canvasElement, step, expect }) {
    step('Expect error when mounted if value is incorrect', () => {
      const error = canvasElement.querySelector('.va-input-wrapper.va-input-wrapper--error') as HTMLElement
      expect(error).not.toBeNull()
    })
  },
})

export const Autocomplete: StoryFn = () => ({
  components: { VaSelect },

  data () {
    // Test if initial value is correctly set
    return { value: 'one', options: ['one', 'two', 'three'] }
  },

  template: '<VaSelect v-model="value" :options="options" autocomplete />',
})

export const AutocompletePlaceholder: StoryFn = () => ({
  components: { VaSelect },

  data () {
    // Test if initial value is correctly set
    return { value: '', options: ['one', 'two', 'three'] }
  },

  template: '<VaSelect v-model="value" :options="options" autocomplete placeholder="test" />',
})

export const AutocompletePlaceholderMultiple: StoryFn = () => ({
  components: { VaSelect },

  data () {
    // Test if initial value is correctly set
    return { value: '', options: ['one', 'two', 'three'] }
  },

  template: '<VaSelect v-model="value" :options="options" autocomplete placeholder="test" multiple />',
})

export const AutocompleteMultiple: StoryFn = () => ({
  components: { VaSelect },

  data () {
    return { value: ['one', 'two'], options: ['one', 'two', 'three'] }
  },

  template: '<VaSelect v-model="value" :options="options" autocomplete multiple />',
})

export const CustomSearch: StoryFn = () => ({
  components: { VaSelect },

  data () {
    return { value: '', options: ['New York', 'London'] }
  },

  methods: {
    searchFn: (query: string, option: string) => {
      const lowerQuery = query.toLowerCase()
      const words = option.split(' ')
      const initials = words.map(word => word[0].toLowerCase()).join('')

      return option.toLowerCase().includes(lowerQuery) || initials === lowerQuery
    },
  },

  template: `
  <VaSelect v-model="value" :options="options" autocomplete :search-fn="searchFn" />`,
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

export const OptionMultipleContentSlot: StoryFn = () => ({
  components: { VaSelect },

  data () {
    return { value: ['one', 'two'], options: ['one', 'two', 'three'] }
  },

  template: `
  <VaSelect v-model="value" :options="options" multiple>
    <template #option-content="{ option, index }">
      <span>{{ option }} ({{ index }})</span>
    </template>
  </VaSelect>`,
})

export const OptionMultipleAutocompleteContentSlot: StoryFn = () => ({
  components: { VaSelect },

  data () {
    return { value: ['one', 'two'], options: ['one', 'two', 'three'] }
  },

  template: `
  <VaSelect v-model="value" :options="options" multiple autocomplete>
    <template #option-content="{ option, index }">
      <span>{{ option }} ({{ index }})</span>
    </template>
  </VaSelect>`,
})
