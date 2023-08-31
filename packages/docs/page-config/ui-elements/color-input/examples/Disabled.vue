<template>
  <va-color-input
    v-model="value"
    class="w-28"
    disabled
  />
</template>

<script>
export default {
  data() {
    return {
      value: "#FF00FF",
    };
  },
};
</script>
