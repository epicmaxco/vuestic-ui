<template>
  <div class="row">
    <div class="flex md6 lg4">
      <va-image
        style="min-height: 300px;"
        src="https://picsum.photos/1500"
      >
        <va-badge text="default slot"/>
      </va-image>
    </div>
    <div class="flex md6 lg4">
        <va-image
          style="min-height: 300px;"
          :src="slotImagePath"
        >
          <template #loader>
            <va-progress-circle indeterminate/>
          </template>
          <template #error>
            Image not found! :(
          </template>
        </va-image>
        <div class="flex">
          <va-button color="success" @click="newImage">
            New image
          </va-button>
          <va-button color="danger" @click="wrongPath">
            Wrong path
          </va-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slotImageSize: 1500,
      slotOverlayPosition: 'top',
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
    wrongPath () {
      this.slotImageSize = -1
    },
  },
}
</script>
