<template>
  <va-image
    class="flex flex-col md6 lg4"
    :src="slotImagePath"
  >
    <template #loader>
      <va-progress-circle indeterminate />
    </template>
  </va-image>

  <va-button class="mt-2" color="success" @click="newImage">
    New image
  </va-button>
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
    newImage () {
      this.slotImageSize = this.slotImageSize !== 1500 ? 1500 : 1501
    },
  },
}
</script>
