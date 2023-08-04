<template>
  <va-textarea
    v-model="value"
    label="Default label (inner)"
    inner-label
  />
</template>

<script>
export default {
  data() {
    return {
      value: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis ultricies nisl nunc quis nisl.
      `.trim(),
    };
  },
};
</script>
