<template>
  <va-textarea
    v-model="value"
    label="Default label (outer)"
  />
</template>

<script>
export default {
  data() {
    return {
      value: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      `.trim(),
    };
  },
};
</script>
