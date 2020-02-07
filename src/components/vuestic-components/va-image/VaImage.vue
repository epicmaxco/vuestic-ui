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
    </template>
  </div>
</template>

<script>
export default {
  name: 'VaImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    ratio: {
      type: [Number, String],
      default: 1,
    },
    contain: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      img: null,
      loading: false,
      loadingError: false,
    }
  },
  beforeDestroy () {
    this.destroyLoader()
  },
  watch: {
    src: {
      handler: function () {
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
        'padding-bottom': `${this.ratio * 100}%`,
      }
    },
  },
  methods: {
    createLoader () {
      this.destroyLoader()
      this.loading = true
      this.loadingError = false
      this.img = new Image()
      this.img.onload = this.handleLoad
      this.img.onerror = this.handleError
      this.img.src = this.src
    },
    destroyLoader () {
      if (this.img) {
        this.img.onload = null
        this.img.onerror = null
        this.img = null
      }
    },
    handleLoad () {
      this.destroyLoader()
      this.loading = false
    },
    handleError () {
      this.destroyLoader()
      this.loadingError = true
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.va-image {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &__img {
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }

  &__img,
  &__loader,
  &__error {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__loader,
  &__error {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
