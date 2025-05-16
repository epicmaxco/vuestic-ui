<template>
  <div
    ref="slidesContainer"
    class="va-carousel-scroll-container"
    role="list"
  >
    <template v-if="effect === 'fade'">
      <VaCarouselEffectFade
        v-model="modelValue"
        :infinite="infinite"
        :swipable="swipable"
        @slides-count="emit('slidesCount', $event)"
      >
        <slot />
      </VaCarouselEffectFade>
    </template>
    <template v-else-if="effect === 'scroll'">
      <VaCarouselEffectScrollInfinite
        v-if="infinite"
        v-model="modelValue"
        :swipable="swipable"
        @slides-count="emit('slidesCount', $event)"
      >
        <slot />
      </VaCarouselEffectScrollInfinite>
      <VaCarouselEffectScroll
        v-else
        v-model="modelValue"
        :swipable="swipable"
        @slides-count="emit('slidesCount', $event)"
      >
        <slot />
      </VaCarouselEffectScroll>
    </template>
    <template v-else>
      <VaCarouselEffectNone
        v-model="modelValue"
        :swipable="swipable"
        :infinite="infinite"
        @slides-count="emit('slidesCount', $event)"
      >
        <slot />
      </VaCarouselEffectNone>
    </template>
  </div>
</template>

<script setup lang="ts">
import VaCarouselEffectScrollInfinite from './VaCarouselEffectScrollInfinite.vue'
import VaCarouselEffectScroll from './VaCarouselEffectScroll.vue'
import VaCarouselEffectFade from './VaCarouselEffectFade.vue'
import { PropType } from 'vue'
import VaCarouselEffectNone from './VaCarouselEffectNone.vue'

const modelValue = defineModel({
  type: Number,
  default: 0,
})

const props = defineProps({
  infinite: { type: Boolean, default: true },
  effect: { type: String as PropType<'scroll' | 'fade' | 'none'>, default: 'scroll' },
  swipable: { type: Boolean, default: true },
})

const emit = defineEmits(['slidesCount'])
</script>

<style lang="scss">
.va-carousel-scroll-container {
  position: relative;
  white-space: nowrap;
  user-select: none;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;

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
