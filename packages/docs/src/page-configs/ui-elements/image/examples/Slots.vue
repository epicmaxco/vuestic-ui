<template>
  <div class="mb-4 w-1/3 flex">
    <va-button class="mr-2" color="success" @click="newImage">
      New image
    </va-button>

    <va-button color="warning" @click="wrongPath">
      Wrong path
    </va-button>
  </div>
  <va-image
    class="flex flex-col md6 lg4"
    :src="slotImagePath"
    @loaded="consoleLog"
    @error="consoleLog"
  >
    <template #loader>
      <va-progress-circle indeterminate />
    </template>

    <template #error>
      <div class="p-8 flex items-center justify-center bg-red-300 rounded-3xl">
        <va-icon name="close" color="danger" :size="32" />
      </div>
    </template>
  </va-image>
</template>

<script setup>
import { ref, computed } from 'vue'

const slotImageSize = ref(1500)

const getImagePath = (width, height = 0) => `https://picsum.photos/${width}/${height || width}`
const newImage = () => (slotImageSize.value = slotImageSize.value !== 1500 ? 1500 : 1501)
const wrongPath = () => (slotImageSize.value = -1)

const slotImagePath = computed(() => getImagePath(slotImageSize.value))

const consoleLog = (e) => console.log(e)
</script>
