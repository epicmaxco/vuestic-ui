<template>
  <va-hover disabled v-model="value">
    <va-button preset="secondary" :border-color="value ? 'primary' : ''">
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
