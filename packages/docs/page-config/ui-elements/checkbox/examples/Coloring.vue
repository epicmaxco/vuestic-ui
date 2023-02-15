<template>
  <div class="flex flex-col">
    <va-checkbox
      v-model="value"
      class="mb-6"
      color="primary"
      label="Primary"
    />
    <va-checkbox
      v-model="value"
      color="#9c27b0"
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
