<template>
  <va-radio
    v-model="value"
    :options="['One', 'Two', 'Three']"
  />
</template>

<script>
export default {
  data() {
    return {
      value: 'one',
    };
  },
};
</script>
