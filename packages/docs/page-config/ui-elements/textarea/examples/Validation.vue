<template>
  <va-textarea
    v-model="value"
    max-length="125"
    label="Short text about something"
    counter
    required-mark
    :rules="[
      (v) => v && v.length > 0 || 'Required',
      (v) => v && v.length < 125,
      (v) => v && v.includes('Lorem') || 'Must include \'Lorem\''
    ]"
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
