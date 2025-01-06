<template>
  <h1 class="text-2xl font-bold mb-4">
    Carbon Sequestration Grant
  </h1>

  <FormKit
    v-model="formValue"
    type="form"
    class="grid grid-cols-1 md:grid-cols-3 gap-6"
    @submit="submitApp"
  >
    <div>
      <FormKit
        type="email"
        name="email"
        label="*Email address"
        validation="required|email"
      />
    </div>

    <div>
      <FormKit
        type="text"
        name="organization_name"
        label="*Organization name"
        validation="required|length:3"
      />
    </div>

    <div>
      <FormKit
        type="textarea"
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
</template>

<script setup>
// NEW: submit handler, which posts to our fake backend.
const submitApp = async (_formData, node) => {
  await new Promise(resolve => setTimeout(resolve, 1400))
  node.clearErrors()
  alert('Your application was submitted successfully!')
}

const formValue = ref({})
</script>

<style scoped>
details {
  border: 1px solid #ccccd7;;
  background: #eeeef4;
  border-radius: .15em;
  padding: 1em;
}
</style>
