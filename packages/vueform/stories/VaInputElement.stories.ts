import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/Input',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <VaInputElement
      name="userName"
      messages="Pick a username people will remember!"
      rules="required"
    >
      <template #label>
      Your username
      </template>
    </VaInputElement>

    <VaInputElement
      name="email"
      label="Email address"
      placeholder="Email address"
      rules="required|email|max:255"
      :debounce="300"
    />

    <VaInputElement
      name="number"
      label="Number"
      input-type="number"
    />

    <VaInputElement
      name="Url"
      label="Url"
      rules="required|url"
    />

  </Vueform>
  `,
})
