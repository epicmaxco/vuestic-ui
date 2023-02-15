<template>
  <va-form style="width: 300px;">
    <va-input
      v-model="inputValue1"
      label="First Name"
      :rules="[(value) => (value && value.length > 0) || 'Field is required']"
    />
    <va-input
      v-model="inputValue2"
      class="mt-3"
      label="Last Name"
      :rules="[(value) => (value && value.length > 0) || 'Field is required']"
    />
  </va-form>
</template>

<script>
export default {
  data() {
    return {
      inputValue1: "",
      inputValue2: "",
    };
  },
};
</script>
