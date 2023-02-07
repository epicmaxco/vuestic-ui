<template>
  <va-chip
    v-for="(color, index) in colors"
    :key="index"
    :color="color"
    class="mr-6 mb-2"
  >
    {{ color }}
  </va-chip>
</template>

<script>
export default {
  data() {
    return {
      colors: ["primary", "danger", "success", "warning", "#7f1f90"],
    };
  },
};
</script>
