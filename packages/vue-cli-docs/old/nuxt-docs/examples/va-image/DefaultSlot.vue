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
  </div>
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
