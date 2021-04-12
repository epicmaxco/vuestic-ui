<template>
  <va-parallax
    target=".base-layout__main"
    :src="imageSrc"
    reversed
  />
</template>

<script>
export default {
  data () {
    return {
      imageSrc: 'https://images.wallpaperscraft.com/image/night_city_signs_neon_139551_1280x800.jpg',
    }
  },
}
</script>
