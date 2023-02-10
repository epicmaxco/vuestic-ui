<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
    <va-viewer class="col-span-1">
      <va-image
        src="https://picsum.photos/600/800"
        :max-width="200"
        fit="contain"
      >
        <template #loader>
          Loading...
        </template>
      </va-image>
    </va-viewer>

    <va-viewer class="col-span-1">
      <template #anchor="{ openViewer, isOpened }">
        <button
          v-if="!isOpened"
          class="mb-2 p-1 border rounded"
          @click="openViewer"
        >
          Open image
        </button>
      </template>
      <template #image>
        <va-image
          src="https://picsum.photos/600/800"
          :max-width="200"
          fit="contain"
        />
      </template>
    </va-viewer>
  </div>
</template>
