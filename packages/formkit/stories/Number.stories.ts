import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Number',
}

export const Default: StoryFn = () => ({
  template: `
    <div class="w-1/5 grid gap-6">
      <FormKit
        type="number"
        help="What temperature should the house be?"
        label="Thermostat"
        name="temperature"
        value="25"
        step="1"
      />
    </div>
  `,
})
