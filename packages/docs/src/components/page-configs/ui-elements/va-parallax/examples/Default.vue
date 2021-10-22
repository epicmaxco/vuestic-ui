<template>
  <va-parallax
    target=".base-layout__content"
    :src="imageSrc"
  />
</template>

<script>
export default {
  data () {
    return {
      imageSrc: 'https://images.wallpaperscraft.com/image/cubes_red_black_131950_1280x800.jpg',
    }
  },
}
</script>
