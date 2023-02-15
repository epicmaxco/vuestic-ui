<template>
  <va-hover
    v-model="value"
    disabled
  >
    <va-button
      preset="secondary"
      :border-color="value ? 'primary' : ''"
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
