<template>
  <div style="max-width: 300px;">
    <va-input
      v-model="value"
      class="mb-6"
    />
    <va-input
      v-model="value"
      class="mb-6"
      placeholder="Placeholder"
    />
    <va-input
      v-model="value"
      class="mb-6"
      label="Name"
      placeholder="Label"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>
