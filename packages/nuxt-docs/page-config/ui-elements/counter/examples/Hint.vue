<template>
  <div class="flex gap-5 flex-wrap">
    <va-counter v-model="value" messages="Select number" />
    <va-counter
      v-model="value"
      :messages="['Select number', 'Select again :)']"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: undefined,
    };
  },
};
</script>Í
