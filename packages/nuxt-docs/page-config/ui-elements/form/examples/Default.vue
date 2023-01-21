<template>
  <va-form style="width: 300px">
    <va-input
      label="First Name"
      v-model="inputValue1"
      :rules="[(value) => (value && value.length > 0) || 'Field is required']"
    />
    <va-input
      class="mt-3"
      label="Last Name"
      v-model="inputValue2"
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
