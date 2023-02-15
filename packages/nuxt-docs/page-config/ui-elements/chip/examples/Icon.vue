<template>
  <va-chip
    v-for="(icon, index) in icons"
    :key="index"
    :icon="icon"
    class="mr-6 mb-2"
  >
    {{ icon }}
  </va-chip>

  <va-chip class="mr-6 mb-2">
    without icon
  </va-chip>
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
