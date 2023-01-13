<template>
  <VbDemo class="flex flex-wrap space-x-4 space-y-4">
    <VbCard title="Default">
      <va-image
        class="image"
        :src="getImagePath(200)"
      />
    </VbCard>

    <VbCard title="Slots (loading, error, placeholder)">
      <div class="mb-2 flex">
        <button class="mr-2" @click="newImage">
          New image
        </button>
        <button @click="wrongPath">
          Wrong path
        </button>
      </div>

      <va-image
        class="image mb-2"
        :src="slotImagePath"
        @loaded="$vb.log('loaded', $event)"
        @error="$vb.log('error', $event)"
      >
        <template #loader>
          Loading
        </template>
        <template #error>
          Error
        </template>
      </va-image>

      <va-image
        class="image"
        :src="slotImagePath"
      >
        <template #placeholder>
          Placeholder (both error and loading states)
        </template>
      </va-image>
    </VbCard>

    <VbCard title="Default slot">
      <va-image
        class="mb-2 image"
        :src="getImagePath(200)"
      >
        <div class="overlay overlay--top">
          Overlay Top
        </div>
      </va-image>

      <va-image
        class="mb-2 image"
        :src="getImagePath(200)"
      >
        <div class="overlay overlay--bottom">
          Overlay Bottom
        </div>
      </va-image>

      <va-image
        class="image"
        :src="getImagePath(200)"
      >
        <div class="overlay overlay--whole">
          Overlay Whole
        </div>
      </va-image>
    </VbCard>

    <VbCard title="4/3">
      <va-image
        class="image"
        :src="getImagePath(200)"
        :ratio="4/3"
      />
    </VbCard>

    <VbCard title="16/9">
      <va-image
        class="image"
        :src="getImagePath(200)"
        :ratio="16/9"
      />
    </VbCard>

    <VbCard title="Portrait">
      <va-image
        class="image"
        :src="getImagePath(200, 100)"
      />
    </VbCard>

    <VbCard title="Landscape">
      <va-image
        class="image"
        :src="getImagePath(100, 200)"
      />
    </VbCard>

    <VbCard title="Contain">
      <va-image
        class="image bg-orange-500"
        fit="contain"
        :src="getImagePath(200, 100)"
      />
    </VbCard>

    <VbCard title="Fill">
      <va-image
        class="image"
        fit="fill"
        :src="getImagePath(200, 100)"
      />
    </VbCard>
  </VbDemo>
</template>

<script setup>
import { ref, computed } from 'vue'

import { VaImage } from './index'

const slotImageSize = ref(1500)

const getImagePath = (width, height = 0) => `https://picsum.photos/${width}/${height || width}`
const newImage = () => (slotImageSize.value = slotImageSize.value !== 1500 ? 1500 : 1501)
const wrongPath = () => (slotImageSize.value = -1)

const slotImagePath = computed(() => getImagePath(slotImageSize.value))
</script>

<style lang="scss" scoped>
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  width: 200px;
}

.loading,
.error {
  @include flex-center;
}

.overlay {
  position: absolute;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;

  &--whole,
  &--top {
    top: 0;
  }

  &--whole,
  &--bottom {
    bottom: 0;
  }

  &--whole,
  &--top,
  &--bottom {
    @include flex-center;
  }
}
</style>
