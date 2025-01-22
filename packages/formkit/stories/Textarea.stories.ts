import { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

export default {
  title: 'Formkit Integration/Textarea',
}

export const Default: StoryFn = () => ({
  setup () {
    const getLength = (value: { instructions: string[] }) => {
      return `${value.instructions ? value.instructions.length : 0} / 120`
    }

    const value = ref({})

    return {
      getLength,
      value,
    }
  },
  template: `
    <div class="w-1/5 grid gap-6">
      <FormKit
        type="form"
        v-model="value"
        :actions="false"
      >
        <FormKit
          type="textarea"
          name="instructions"
          label="Your Essay"
          placeholder="Remember to write in complete sentences."
          :help="getLength(value)"
          validation="length:0,120"
          validation-visibility="live"
          :validation-messages="{
            length: 'Instructions cannot be more than 120 characters.',
          }"
        />
      </FormKit>
    </div>
  `,
})
