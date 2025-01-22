import { StoryFn } from '@storybook/vue3'

export default {
  title: 'Formkit Integration/File',
}

export const Default: StoryFn = () => ({
  template: `
    <div class="w-1/5 grid gap-6">
      <FormKit
        type="file"
        label="Documents"
        accept=".pdf,.doc,.docx,.xml,.md,.csv"
        help="Select as many documents as you would like."
      />
    </div>
  `,
})
