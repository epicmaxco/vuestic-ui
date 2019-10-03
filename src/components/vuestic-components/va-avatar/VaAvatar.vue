<template>
  <div class="va-avatar" ref="avatar" :style="computedStyle">
    <va-icon v-if="icon" :name="icon" />
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

  },
}
</script>

<style lang="scss">
.va-avatar {
  display: flex;
  overflow: hidden;
  align-items: 'center';
  justify-content: 'center';
  flex-direction: column;
  text-align: center;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  span, i, img{
    line-height: 100%;
    margin: auto;
  }
}
</style>
