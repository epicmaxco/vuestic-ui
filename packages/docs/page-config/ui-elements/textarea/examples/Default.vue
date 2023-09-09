<template>
  <va-textarea v-model="value" />
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
