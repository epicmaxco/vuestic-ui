<template>
  <div class="va-image">
    <div
      v-if="loadingError"
      class="va-image__error"
    >
      <slot name="error" />
    </div>

    <div :style="paddingStyles" />
    <div
      v-show="!loadingError && !loading"
      class="va-image__img"
      ref="img"
    >
      <img
        :style="imageStyles"
        :src="src"
        @error="handleError"
        @load="handleLoad"
      />
    </div>
    <div class="va-image__overlay">
      <slot />
    </div>
    <div
      v-if="loading"
      class="va-image__loader"
    >
      <slot name="loader" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, PropType, ref } from 'vue'

export default defineComponent({
  name: 'VaImage',
  emits: ['loaded', 'error'],
  props: {
    ratio: { type: Number as PropType<number>, default: 1 },
    contain: { type: Boolean as PropType<boolean>, default: false },
    src: { type: String as PropType<string>, required: true },
  },
  setup (props, { emit }) {
    const loading = ref(true)
    const loadingError = ref(false)

    const imageStyles = computed(() => ({
      objectFit: props.contain ? 'contain' as const : 'cover' as const,
    }))

    const paddingStyles = computed(() => ({
      paddingBottom: `${1 / props.ratio * 100}%`,
    }))

    const handleLoad = () => {
      loading.value = false
      emit('loaded', props.src)
    }

    const handleError = (err: Event) => {
      loadingError.value = true
      loading.value = false
      emit('error', err)
    }

    watch(() => props.src, () => {
      loading.value = true
      loadingError.value = false
    })

    return {
      loading,
      loadingError,
      imageStyles,
      paddingStyles,
      handleLoad,
      handleError,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-image {
  overflow: var(--va-image-overflow);
  position: var(--va-image-position);
  font-family: var(--va-font-family);

  img {
    height: 100%;
    width: 100%;
  }

  &__img,
  &__loader,
  &__error,
  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__loader,
  &__error,
  &__overlay {
    @include flex-center();
  }
}
</style>
