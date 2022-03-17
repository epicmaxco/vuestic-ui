<template>
  <div>
    <va-chip
      v-for="(icon, index) in icons"
      :key="index"
      :icon="icon"
      class="mr-4"
    >
      {{ icon }}
    </va-chip>
    <va-chip>without icon</va-chip>
  </div>
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
