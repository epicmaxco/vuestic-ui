import { StoryFn } from '@storybook/vue3'
import VaSelectDemo from './VaSelect.demo.vue'
import VaSelect from './VaSelect.vue'

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
    return { value: '', options: ['one', 'two', 'tree'], rules: [(v) => (v && v === 'one') || 'Must be one'] }
  },

  template: '<VaSelect v-model="value" :options="options" :rules="rules" />',
})

export const DirtyValidation: StoryFn = () => ({
  components: { Component: VaSelect },

  data () {
    return { value: '', dirty: false, options: ['one', 'two', 'tree'], rules: [(v) => (v && v === 'one') || 'Must be one'] }
  },

  mounted () {
    this.value = 'three'
  },

  template: `
  <p>[dirty]: {{ dirty }}</p>
  <Component v-model="value" v-model:dirty="dirty" :options="options" :rules="rules" clearable />
  <p> [controls] </p>
  <div>
    <button @click="value = 'two'">Change value to two</button>
  </div>
  `,
})

export const DirtyImmediateValidation: StoryFn = () => ({
  components: { Component: VaSelect },

  data () {
    return { value: '', dirty: false, options: ['one', 'two', 'tree'], rules: [(v) => (v && v === 'one') || 'Must be one'] }
  },

  mounted () {
    this.value = 'three'
  },

  template: `
  <p>[dirty]: {{ dirty }}</p>
  <Component v-model="value" v-model:dirty="dirty" :options="options" :rules="rules" clearable immediate-validation />
  <p> [controls] </p>
  <div>
    <button @click="value = 'two'">Change value to two</button>
  </div>
  `,
})
