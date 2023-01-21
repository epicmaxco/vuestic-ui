<template>
  <va-image
    class="flex flex-col md6 lg4"
    src="https://picsum.photos/1500"
  >
    <va-badge text="default slot" />
  </va-image>
</template>

<script>
export default {
  data () {
    return {
      slotImageSize: 1500,
    }
  },
  computed: {
    slotImagePath () {
      return this.getImagePath(this.slotImageSize)
    },
  },
  methods: {
    getImagePath (width, height = width) {
      return `https://picsum.photos/${width}/${height}`
    },
  },
}
</script>
