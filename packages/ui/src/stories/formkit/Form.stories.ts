import { StoryFn } from '@storybook/vue3'
import * as types from '@vuestic/formkit'
import { ref } from 'vue'
import { VaCollapse } from 'vuestic-ui'

export default {
  title: 'Formkit Integration/Form',
}

export const Basic: StoryFn = () => ({
  components: {
    VaCollapse,
  },
  setup () {
    // NEW: submit handler, which posts to our fake backend.
    const submitApp = async (_formData: any, node: any) => {
      await new Promise(resolve => setTimeout(resolve, 1400))
      node.clearErrors()
      alert('Your application was submitted successfully!')
    }

    const formValue = ref({})

    return {
      types,
      formValue,
      submitApp,
    }
  },
  template: `
      <h1 class="text-2xl font-bold mb-4">
        Carbon Sequestration Grant
      </h1>

      <FormKit
        v-slot="{ state: { loading } }"
        v-model="formValue"
        :type="types.form"
        class="grid grid-cols-1 gap-6"
        :submit-label="loading ? 'Submitting...' : ''"
        @submit="submitApp"
      >
        <div>
          <FormKit
            :type="types.email"
            name="email"
            label="*Email address"
            validation="required|email"
          />
        </div>

        <div>
          <FormKit
            :type="types.text"
            name="organization_name"
            label="*Organization name"
            validation="required|length:3"
          />
        </div>

        <div>
          <FormKit
            :type="types.textarea"
            name="money_use"
            label="*How will you use the money?"
            validation="required|length:5,10"
          />
        </div>
      </FormKit>

      <VaCollapse
        class="min-w-96 mt-4"
        header="Form data"
      >
        <pre>{{ formValue }}</pre>
      </VaCollapse>
  `,
})
