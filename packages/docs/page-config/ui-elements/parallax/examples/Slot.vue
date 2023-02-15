<template>
  <va-parallax :src="imageSrc">
    <div
      class="flex items-center justify-center"
      style="height: 100%;"
    >
      <va-icon
        class="mr-8"
        name="mdi-calendar-blank-outline"
        size="36px"
        color="#fff"
      />
      <va-icon
        class="mr-8"
        name="mdi-close"
        size="36px"
        color="#fff"
      />
      <va-icon
        class="mr-8"
        name="mdi-heart-outline"
        size="36px"
        color="#fff"
      />
      <va-icon
        class="mr-8"
        name="mdi-folder-outline"
        size="36px"
        color="#fff"
      />
      <va-icon
        name="mdi-alarm"
        size="36px"
        color="#fff"
      />
    </div>
  </va-parallax>
</template>

<script>
export default {
  data() {
    return {
      imageSrc:
        "https://images.wallpaperscraft.com/image/single/ocean_beach_aerial_view_134429_1280x800.jpg",
    };
  },
};
</script>
