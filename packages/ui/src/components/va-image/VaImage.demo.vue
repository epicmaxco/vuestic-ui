<template>
  <VbDemo class="flex flex-wrap space-x-4 space-y-4">
    <VbCard title="Default">
      <va-image
        class="image"
        :src="getImagePath(200)"
      />
    </VbCard>

    <VbCard title="Progressive loading">
      <va-image
        class="image"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        placeholder-src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
      />
    </VbCard>

    <VbCard title="Slots (loading, error, placeholder)">
      <div class="mb-2 flex">
        <button class="mr-2 border border-gray-200 rounded" @click="newImage">
          New image
        </button>
        <button class="border border-gray-200 rounded" @click="wrongPath">
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
        class="image mb-2"
        :src="slotImagePath"
      >
        <template #placeholder>
          Placeholder (both error and loading states)
        </template>
      </va-image>

      <va-image
        class="image"
        :src="slotImagePath"
        fallback-text="Fallback text"
      />
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
        class="mb-2 image"
        :src="getImagePath(200)"
      >
        <div class="overlay overlay--whole">
          Overlay
        </div>
      </va-image>

      <va-image
        class="image"
        :src="getImagePath(200)"
      >
        <div class="overlay overlay--whole overlay--gradient">
          Overlay with gradient
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
        style="height: 100px;"
        :src="getImagePath(200, 100)"
      />
    </VbCard>

    <VbCard title="Contain">
      <va-image
        class="image bg-gray-200"
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

    <VbCard title="Scrset and sizes">
      <va-image
        class="image"
        :src="getImagePath(200)"
        :srcset="`${getImagePath(201)} 400w,
                ${getImagePath(202)} 800w,
                ${getImagePath(203)} 1200w,
                ${getImagePath(204)} 1600w`"
        sizes="(max-width: 400px) 400w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"
        @loaded="$vb.log('srcset rendered image is', $event)"
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

  &--gradient {
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0.3) 100%);
  }

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
