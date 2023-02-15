<template>
  <va-hover v-model="value">
    <va-button
      color="success"
      :preset="value ? 'primary' : 'secondary'"
    >
      {{ value }}
    </va-button>
  </va-hover>
</template>

<script>
export default {
  data() {
    return {
      value: false,
    };
  },
};
</script>
