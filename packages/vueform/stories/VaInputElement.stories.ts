import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/Input',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform>
    <h2>Text input</h2>
    <VaInputElement
      name="userName"
      messages="Pick a username people will remember!"
      rules="required"
    >
      <template #label>
      Your username
      <template/>
    </VaInputElement>

    <h2>Email</h2>
    <VaInputElement
      name="email"
      placeholder="Email address"
      rules="required|email|max:255"
      :debounce="300"
    />

    <h2>Number</h2>
    <VaInputElement
      name="number"
      input-type="number"
    />

    <h2>Url</h2>
    <VaInputElement
      name="Url"
      rules="required|url"
    />

  </Vueform>
  `,
})
