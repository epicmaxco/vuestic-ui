<template>
  <VbDemo class="flex flex-wrap space-x-4 space-y-4">
    <VbCard title="Default">
      <va-viewer>
        <va-image
          :src="getImagePath(600, 800)"
          :max-width="200"
          fit="contain"
        >
          <template #loader>
            Loading...
          </template>
        </va-image>
      </va-viewer>
    </VbCard>

    <VbCard title="Custom anchor">
      <va-viewer>
        <template #anchor="{ openViewer }">
          <button
            class="mb-2 p-1 border rounded"
            @click="openViewer"
          >
            Open image
          </button>
        </template>
        <template #image>
          <va-image
            :src="getImagePath(600, 800)"
            :max-width="200"
            fit="contain"
          />
        </template>
      </va-viewer>
    </VbCard>

    <VbCard title="Custom controls">
      <va-viewer>
        <va-image
          :src="getImagePath(600, 800)"
          :max-width="200"
          fit="contain"
        />
        <template #controls>
          <button
            class="mr-2"
            @click="$vb.log('Make some stuff.')"
          >
            <va-icon
              name="warning"
              color="warning"
            />
          </button>
        </template>
        <template #close="{ close }">
          <button
            class="text-white"
            @click="close"
          >
            Close
          </button>
        </template>
      </va-viewer>
    </VbCard>
  </VbDemo>
</template>

<script setup>
import { VaImage, VaViewer, VaIcon } from '../'

const getImagePath = (width, height = 0) => `https://picsum.photos/${width}/${height || width}`
</script>
