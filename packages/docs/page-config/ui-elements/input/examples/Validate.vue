<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <va-input
      v-model="value"
      :rules="[(v) => v.length > 3 || `Fulfill the condition`]"
      label="Email"
      placeholder="Type more than 3 symbols"
    />
    <va-input
      v-model="value"
      label="Email"
      placeholder="Error state"
      error
    />
    <va-input
      v-model="value"
      label="Email"
      placeholder="Error with message"
      error
      :error-messages="errorMessage"
    />
    <va-input
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
  name: "Validate",
  data() {
    return {
      value: "",
      errorMessage: "Please enter correct email",
      successMessage: "The entered email is correct",
    };
  },
};
</script>
