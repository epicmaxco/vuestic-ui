<template>
  <VaRadio
    v-model="value"
    :rules="[
      (v) => v !== null || 'Required',
      (v) => !!v || 'You must be 18 or older',
    ]"
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
