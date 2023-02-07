<template>
  <div class="flex flex-col">
    <va-checkbox class="mb-6" color="primary" v-model="value" label="Primary" />
    <va-checkbox
      color="#9c27b0"
      v-model="value"
      label="Custom color with icon"
      checked-icon="loop"
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
