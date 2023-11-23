<template>
  <VaChip
    v-for="(icon, index) in icons"
    :key="index"
    :icon="icon"
    class="mr-6 mb-2"
  >
    {{ icon }}
  </VaChip>

  <VaChip class="mr-6 mb-2">
    without icon
  </VaChip>
</template>

<script>
export default {
  data() {
    return {
      icons: ["face", "email", "thumb_up", "info", "remove"],
    };
  },
};
</script>
