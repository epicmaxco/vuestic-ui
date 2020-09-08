<template>
  <div>
    <va-input
      class="my-2"
      v-model="value"
      :rules="[(value) => value.length > 3 || `Fulfill the condition`]"
      label="Email"
      placeholder="Type more than 3 symbols"
    />
    <va-input
      class="my-2"
      v-model="value"
      label="Email"
      placeholder="Error state"
      error
    />
    <va-input
      class="my-2"
      v-model="value"
      label="Email"
      placeholder="Success state"
      success
    />
    <va-input
      class="my-2"
      v-model="value"
      label="Email"
      placeholder="Error with message"
      error
      :error-messages="errorMessage"
    />
    <va-input
      class="my-2"
      v-model="value"
      label="Email"
      placeholder="Success with message"
      removable
      success
      :messages="successMessage"
    />
  </div>
</template>

<script>
export default {
  name: 'Validate',
  data () {
    return {
      value: '',
      errorMessage: 'Please enter correct email',
      successMessage: 'The entered email is correct',
    }
  },
}
</script>
