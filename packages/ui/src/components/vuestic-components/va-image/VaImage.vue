<template>
  <div class="va-image">
    <div
      v-if="loadingError"
      class="va-image__error"
    >
      <slot name="error" />
    </div>
    <div
      v-if="loading"
      class="va-image__loader"
    >
      <slot name="loader" />
    </div>
    <template v-else>
      <div :style="paddingStyles" />
      <div
        class="va-image__img"
        :style="imageStyles"
        ref="img"
      />
      <div class="va-image__overlay">
        <slot />
      </div>
    </template>
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
  image: any = null
  loading = false
  loadingError = false

  created () {
    watch(() => this.src, () => {
      this.createLoader()
    })
  }

  beforeUnmount () {
    this.destroyLoader()
  }

  get imageStyles () {
    return {
      'background-image': `url(${this.src})`,
      'background-size': this.contain ? 'contain' : 'cover',
    }
  }

  get paddingStyles () {
    return {
      'padding-bottom': `${1 / this.ratio * 100}%`,
    }
  }

  createLoader () {
    this.destroyLoader()
    this.loading = true
    this.loadingError = false
    this.image = new Image()
    this.image.onload = this.handleLoad
    this.image.onerror = this.handleError
    if (this.src) {
      this.image.src = this.src
    }
  }

  destroyLoader () {
    if (this.image) {
      this.image.onload = null
      this.image.onerror = null
      this.image = null
    }
  }

  handleLoad () {
    this.destroyLoader()
    this.loading = false
    this.$emit('loaded', this.src)
  }

  handleError (err: string) {
    this.destroyLoader()
    this.loadingError = true
    this.loading = false
    this.$emit('error', err)
  }
}
</script>

<style lang="scss" scoped>
@import "../../vuestic-sass/resources/resources";

.va-image {
  overflow: hidden;
  position: relative;

  &__img {
    background-position: 50% 50%;
    background-repeat: no-repeat;
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
