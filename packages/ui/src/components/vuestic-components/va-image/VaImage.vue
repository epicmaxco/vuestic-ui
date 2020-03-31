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

<script>
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaImage',
  mixins: [
    makeContextablePropsMixin({
      ratio: {
        type: [Number, String],
        default: 1,
      },
      contain: {
        type: Boolean,
        default: false,
      },
    }),
  ],
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      image: null,

      loading: false,
      loadingError: false,
    }
  },
  beforeDestroy () {
    this.destroyLoader()
  },
  watch: {
    src: {
      handler () {
        this.createLoader()
      },
      immediate: true,
    },
  },
  computed: {
    imageStyles () {
      return {
        'background-image': `url(${this.src})`,
        'background-size': this.contain ? 'contain' : 'cover',
      }
    },
    paddingStyles () {
      return {
        'padding-bottom': `${1 / this.c_ratio * 100}%`,
      }
    },
  },
  methods: {
    createLoader () {
      this.destroyLoader()
      this.loading = true
      this.loadingError = false
      this.image = new Image()
      this.image.onload = this.handleLoad
      this.image.onerror = this.handleError
      this.image.src = this.src
    },
    destroyLoader () {
      if (this.image) {
        this.image.onload = null
        this.image.onerror = null
        this.image = null
      }
    },
    handleLoad () {
      this.destroyLoader()
      this.loading = false
      this.$emit('loaded', this.src)
    },
    handleError (err) {
      this.destroyLoader()
      this.loadingError = true
      this.loading = false
      this.$emit('error', err)
    },
  },
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
