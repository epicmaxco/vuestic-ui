import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Vueform Integration/Rating',
}

export const Default: StoryFn = () => ({
  template: `
  <Vueform :endpoint="false">
    <VaRatingElement
      name="rating"
      label="Rate us"
      color="success"
    />
    <VaInputElement
      name="comment"
      :conditions="[
        ['rating', '<', 3],
        ['rating', '!=', null]
      ]"
      label="Comment"
    />
  </Vueform>
  `,
})

