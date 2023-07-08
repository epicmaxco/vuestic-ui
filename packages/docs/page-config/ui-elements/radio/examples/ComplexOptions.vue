<template>
  <va-radio
    v-model="value"
    :options="[
      {
        text: 'I\'m 18 or older',
        value: true,
      },
      {
        text: 'I\'m under 18',
        value: false,
      },
    ]"
    value-by="value"
  />

  Value: {{ value }}
</template>

<script>
export default {
  data() {
    return {
      value: null,
    };
  },
};
</script>
