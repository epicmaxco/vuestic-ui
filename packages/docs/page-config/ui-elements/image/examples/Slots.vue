<template>
  <div class="mb-4 flex gap-2">
    <va-button
      color="success"
      @click="newImage"
    >
      New image
    </va-button>

    <va-button
      color="warning"
      @click="wrongPath"
    >
      Wrong path
    </va-button>
  </div>

  <div class="flex gap-4">
    <va-image
      :src="slotImagePath"
      @loaded="consoleLog"
      @error="consoleLog"
    >
      <template #loader>
        <va-progress-circle indeterminate />
      </template>

      <template #error>
        <div class="p-8 flex items-center justify-center bg-red-300 rounded-3xl">
          <va-icon
            name="close"
            color="danger"
            :size="32"
          />
        </div>
      </template>
    </va-image>

    <va-image
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
