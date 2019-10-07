<template>
  <div class="va-avatar" ref="avatar" :style="computedStyle" :class="computedClass">
    <va-icon v-if="icon" :name="icon"  />
    <img v-else-if="src" :src="src" />
    <span v-else><slot/></span>
  </div>
</template>

<script>
import { SizeMixin } from '../../../mixins/SizeMixin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import VaIcon from '../va-icon/VaIcon'

export default {
  name: 'va-avatar',
  mixins: [SizeMixin, ColorThemeMixin],
  components: {
    VaIcon,
  },
  props: {
    color: {
      type: String,
      default: 'info',
    },
    textColor: {
      type: String,
    },
    square: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    src: {
      type: String,
    },
    portrait: {
      type: Boolean,
    },
    fontSize: {
      type: String,
    },
  },
  methods: {
    udpdateFontSize () {
      this.$refs.avatar.style.fontSize = `${this.$refs.avatar.offsetHeight * 0.6}px`
    },
  },
  mounted () {
    if (!this.fontSize) {
      this.udpdateFontSize()
    }
  },
  computed: {
    computedStyle () {
      return {
        color: this.textColor ? (this.$themes[this.textColor] || this.computeColor(this.textColor)) : '#ffffff',
        backgroundColor: this.$themes[this.color] || this.colorComputed,
        borderRadius: this.square ? 0 : '50%',
        fontSize: this.fontSize || '',
        ...this.getPropSize('width'),
        ...this.getPropSize('height'),
      }
    },
    computedClass () {
      return {
        'va-avatar-portrait': this.portrait,
      }
    },
  },
}
</script>

<style lang="scss">
.va-avatar {
  display: flex;
  position: relative;
  overflow: hidden;
  align-items: 'center';
  justify-content: 'center';
  text-align: center;

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

  span, i, img {
    line-height: 100%;
    margin: auto;
  }

  &-portrait img {
    width: 100%;
    height: auto;
  }
}
</style>
