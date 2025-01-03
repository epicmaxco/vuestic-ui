import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/Button',
}

export const Default: StoryFn = () => ({
  setup () {
    const randomColor = (e: { target: { setAttribute: (...args: string[]) => void } }) => {
      const hex = Math
        .floor(Math.random() * 16777215)
        .toString(16)
      e.target.setAttribute(
        'style',
        'background-color: #' + hex + '88;',
      )
    }

    return {
      randomColor,
    }
  },
  template: `
    <div class="grid gap-6">
      <h2>Basic example</h2>
      <FormKit
        type="button"
        label="Checkout my label"
        help="You can use the label prop."
      />

      <h2>Default slot</h2>
      <FormKit
        type="button"
        help="You can use the default slot."
        prefix-icon="check"
      >
        I have slot content
      </FormKit>

      <h2>Event listeners</h2>
      <FormKit
        type="button"
        help="You can bind event listeners."
        @click="randomColor"
      >
        Click me!
      </FormKit>

      <h2>Loading</h2>
      <FormKit
        type="button"
        help="You can bind event listeners."
        loading
      >
        Click me!
      </FormKit>
    </div>
  `,
})
