<template>
  <div
    ref="slidesContainer"
    class="va-carousel-scroll-container"
    role="list"
  >
    <div
      v-if="$slots.default"
      class="va-carousel-scroll-container__shifter"
      :style="{
        transform: `translateX(-${shiftX}px)`,
      }"
      ref="shifter"
    >
      <div class="va-carousel-scroll-container__clone va-carousel-scroll-container__clone--first">
        <slot  v-for="i in cloneCount" :key="i" />
      </div>

      <slot />

      <div class="va-carousel-scroll-container__clone">
        <slot  v-for="i in cloneCount" :key="i" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useElementPressed, useMouse } from '../../../composables/std'
import { watch } from 'vue';
import { onMounted } from 'vue';
import { onUpdated } from 'vue';
import { useCarouselShifterFinite, useCarouselShifterInfinite } from '../hooks/useCarouselShifter'


const shifter = ref<HTMLElement | null>(null)

const modelValue = defineModel({
  type: Number,
  default: 0,
})

const emit = defineEmits(['slidesCount'])

const { getSlides, cloneCount, shiftX } = useCarouselShifterInfinite(shifter, modelValue)

onMounted(() => {
  emit('slidesCount', getSlides().length)
})

onUpdated(() => {
  emit('slidesCount', getSlides().length)
})
</script>

<style lang="scss">
  .va-carousel-scroll-container {
    position: relative;
    white-space: nowrap;
    user-select: none;
    overflow: hidden;
    width: 100%;

    &__shifter {
      white-space: nowrap;
      display: flex;
      flex-wrap: nowrap;
      transition: transform 0.5s linear;

      & > * {
        flex: 0 0 auto;
      }
    }

    &__clone {
      vertical-align: top;
      width: 100%;
      display: flex;

      & > * {
        flex: 0 0 auto;
      }

      &--first {
        margin-left: -100%;
        justify-content: flex-end;
      }
    }
  }
</style>
