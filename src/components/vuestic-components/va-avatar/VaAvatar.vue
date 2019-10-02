<template>
  <div class="va-avatar" :style="computedStyle">
    <va-icon v-if="icon" :name="icon" />
    <img v-if="src" :src="src" />
    <span v-if="!icon && !src"><slot/></span>
  </div>
</template>

<script>
import { sizeMixin } from '@/mixins/SizeMixin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import VaIcon from '../va-icon/VaIcon'

export default {
  name: 'va-avatar',
  mixins: [sizeMixin, ColorThemeMixin],
  components: {
    VaIcon,
  },
  props: {
    color: {
      type: String,
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
  },

  computed: {
    computedStyle () {
      return {
        color: this.color ? (this.textColor ? this.$themes[this.textColor] : '#ffffff') : '#ffffff',
        backgroundColor: this.$themes[this.color] || this.colorComputed,
        borderRadius: this.square ? 0 : '50%',
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
    width: 100%;
  }

  span, i {
    line-height: 100%;
    margin: auto;
  }

}
</style>
