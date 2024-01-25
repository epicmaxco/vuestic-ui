<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start">
    <VaInput
      v-model="value"
      :rules="[(v) => v.length > 3 || `Fulfill the condition`]"
      label="Email"
      placeholder="Type more than 3 symbols"
    />
    <VaInput
      v-model="value"
      label="Email"
      placeholder="Error state"
      error
    />
    <VaInput
      v-model="value"
      label="Email"
      placeholder="Error with message"
      immediate-validation
      error
      :error-messages="errorMessage"
    />
    <VaInput
      v-model="value"
      label="Email"
      placeholder="Success with message"
      immediate-validation
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
