<template>
  <va-parallax
    target=".base-layout__content"
    :src="imageSrc"
    :height="200"
    :speed="1"
  />
</template>

<script>
export default {
  data () {
    return {
      imageSrc: 'https://images.wallpaperscraft.com/image/street_city_autumn_131015_1280x800.jpg',
    }
  },
}
</script>
