<template>
  <div class="flex items-start">
    <va-switch
      v-model="value"
      error
      class="mr-6"
    />
    <va-switch
      v-model="value"
      error
      error-messages="error message"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>
