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
      <img :style="imageStyles" :src="src" @error="handleError" @load="handleLoad" />
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
import { watch } from 'vue'
import { Options, prop, Vue, mixins } from 'vue-class-component'

class ImageProps {
  ratio = prop<number>({ type: [Number], default: 1 })
  contain = prop<boolean>({ type: Boolean, default: false })
  src = prop<string>({ type: String, required: true })
}

const ImagePropsMixin = Vue.with(ImageProps)

@Options({
  name: 'VaImage',
  emits: ['loaded', 'error'],
})
export default class VaImage extends mixins(
  ImagePropsMixin,
) {
  loading = true
  loadingError = false

  created () {
    watch(() => this.src, () => {
      this.loading = true
      this.loadingError = false
    })
  }

  get imageStyles () {
    return {
      'object-fit': this.contain ? 'contain' : 'cover',
    }
  }

  get paddingStyles () {
    return {
      'padding-bottom': `${1 / this.ratio * 100}%`,
    }
  }

  handleLoad () {
    this.loading = false
    this.$emit('loaded', this.src)
  }

  handleError (err: string) {
    this.loadingError = true
    this.loading = false
    this.$emit('error', err)
  }
}
</script>

<style lang="scss">
@import "../../styles/resources";
@import 'variables';

.va-image {
  overflow: var(--va-image-overflow);
  position: var(--va-image-position);

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
