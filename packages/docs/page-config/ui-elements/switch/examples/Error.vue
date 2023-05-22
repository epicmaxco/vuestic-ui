<template>
  <div class="flex gap-8 flex-wrap">
    <va-switch
      v-model="value"
      error
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
