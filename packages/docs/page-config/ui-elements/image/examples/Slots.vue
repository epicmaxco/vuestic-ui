<template>
  <div class="mb-4 flex gap-2">
    <VaButton
      color="success"
      @click="newImage"
    >
      New image
    </VaButton>

    <VaButton
      color="warning"
      @click="wrongPath"
    >
      Wrong path
    </VaButton>
  </div>

  <div class="flex gap-4">
    <VaImage
      :src="slotImagePath"
      @loaded="consoleLog"
      @error="consoleLog"
    >
      <template #loader>
        <VaProgressCircle indeterminate />
      </template>

      <template #error>
        <div class="p-8 flex items-center justify-center bg-red-300 rounded-3xl">
          <VaIcon
            name="close"
            color="danger"
            :size="32"
          />
        </div>
      </template>
    </VaImage>

    <VaImage
      :src="slotImagePath"
      fallback-text="Fallback will work if error slot wasn't passed"
    />
  </div>
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
