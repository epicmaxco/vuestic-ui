<template>
  <h1 class="text-2xl font-bold mb-4">
    Carbon Sequestration Grant
  </h1>

  <FormKit
    v-slot="{ value, state: { loading } }"
    :type="types.form"
    class="flex flex-col items-baseline gap-6"
    :submit-label="loading ? 'Submitting...' : ''"
    @submit="submitApp"
  >
    <h3 class="text-lg font-bold mb-2">
      Contact info
    </h3>
    <FormKit
      :type="types.email"
      label="*Email address"
      validation="required|email"
    />

    <h3 class="text-lg font-bold mb-2">
      Organization info
    </h3>
    <FormKit
      :type="types.text"
      label="*Organization name"
      validation="required|length:3"
    />

    <h3 class="text-lg font-bold mb-2">
      Application
    </h3>
    <FormKit
      :type="types.textarea"
      label="*How will you use the money?"
      validation="required|length:5,10"
    />

    <details>
      <summary>Form data</summary>
      <pre>{{ value }}</pre>
    </details>
  </FormKit>
</template>

<script setup>
import * as types from '@vuestic/formkit'

// NEW: submit handler, which posts to our fake backend.
const submitApp = async (_formData, node) => {
  await new Promise(resolve => setTimeout(resolve, 1400))
  node.clearErrors()
  alert('Your application was submitted successfully!')
}
</script>

<style scoped>
details {
  border: 1px solid #ccccd7;;
  background: #eeeef4;
  border-radius: .15em;
  padding: 1em;
}
</style>
