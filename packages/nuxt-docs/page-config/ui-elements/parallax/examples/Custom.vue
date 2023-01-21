<template>
  <va-parallax
    :src="imageSrc"
    :height="200"
    :speed="1"
  />
</template>

<script>
export default {
  data () {
    return {
      imageSrc: 'https://images.wallpaperscraft.com/image/single/ocean_beach_aerial_view_134429_1280x800.jpg',
    }
  },
}
</script>
