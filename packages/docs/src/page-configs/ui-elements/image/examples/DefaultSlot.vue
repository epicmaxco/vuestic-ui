<template>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
  <va-image
    class="col-span-1"
    :src="getImagePath(200)"
  >
    <div class="overlay top-0">
      Overlay Top
    </div>
  </va-image>

  <va-image
    class="col-span-1"
    :src="getImagePath(200)"
  >
    <div class="overlay bottom-0">
      Overlay Bottom
    </div>
  </va-image>

  <va-image
    class="col-span-1"
    :src="getImagePath(200)"
  >
    <div class="overlay top-0 bottom-0">
      Overlay
    </div>
  </va-image>

  <va-image
    class="col-span-1"
    :src="getImagePath(200)"
  >
    <div class="overlay top-0 bottom-0 gradient">
      Overlay with gradient
    </div>
  </va-image>
</div>
</template>

<script setup>
import { computed } from 'vue'

const getImagePath = (width, height = 0) => `https://picsum.photos/${width}/${height || width}`

const slotImagePath = computed(() => getImagePath(1500))
</script>

<style lang="scss" scoped>
.overlay {
  @apply absolute left-0 right-0 p-4 flex justify-center items-center bg-gray-400 bg-opacity-50 text-white;
}

.gradient {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0.3) 100%);
}
</style>
