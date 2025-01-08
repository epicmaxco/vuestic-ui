import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Radio',
}

export const Default: StoryFn = () => ({
  setup () {
    const form = ref({})
    return {
      form,
    }
  },
  template: `
    <FormKit v-model="form" type="form" :actions="false">
      <FormKit
        name="transportation"
        v-model="form.transportation"
        type="radio"
        label="Preferred transportation"
        :options="['E-Bike', 'E-Scooter', 'Electric car', 'Walking', 'Space tube']"
        help="How do you like to get around?"
      />
    </FormKit>
  `,
})
