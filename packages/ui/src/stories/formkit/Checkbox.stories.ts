import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Checkbox',
}

export const SingleCheckbox: StoryFn = () => ({
  setup () {
    const value = ref(true)
    return {
      types,
      value,
    }
  },
  template: `
    <FormKit
      :type="types.checkbox"
      label="Terms and Conditions"
      help="Do you agree to our terms of service?"
      name="terms"
      v-model="value"
      validation="accepted"
      validation-visibility="dirty"
    />
  `,
})

export const MultipleCheckbox: StoryFn = () => ({
  setup () {
    const value = ref([])
    return {
      types,
      value,
    }
  },
  template: `
    <div class="grid gap-6">
      <h2>Array of strings</h2>
      <FormKit
        v-model="value"
        :type="types.checkbox"
        label="Toppings"
        :options="['Mushrooms', 'Olives', 'Salami', 'Anchovies']"
        decorator-icon="happy"
        help="Select your pizza toppings"
        validation="required|min:3"
      />

      <h2>Array of Value/Label objects</h2>
      <FormKit
        v-model="value"
        :type="types.checkbox"
        label="Trim extras"
        :options="{
          650: 'Leather seats ($650)',
          1200: 'Sweet rims ($1,200)',
          13250: 'Gold leaf ($13,250)',
          500: 'Massaging seats ($500)'
        }"
        help="Configure your car’s trim options"
      />

      <h2>Array of objects</h2>
      <FormKit
        v-model="value"
        :type="types.checkbox"
        label="Indian food"
        :options="[
          {
            value: 'item-2',
            label: 'Bhajji',
            help: 'Fried chickpea batter — spicy.',
          },
          {
            value: 'item-55',
            label: 'Vada Pav (out of stock)',
            help: 'Fried vegetarian dumplings.',
            attrs: { disabled: true }
          },
          {
            value: 'item-22',
            label: 'Paratha',
            help: 'Flatbread layered and pan friend.',
          },
          {
            value: 'item-44',
            label: 'Halwa',
            help: 'Pudding made with flour.',
          }
        ]"
        help="Select your favorite Indian dishes."
      />
    </div>
  `,
})
