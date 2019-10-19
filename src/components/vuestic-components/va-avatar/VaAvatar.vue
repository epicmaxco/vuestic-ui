<template>
  <div class="va-avatar" ref="avatar" :style="computedStyle">
    <slot>
      <va-icon v-if="icon" :name="icon"/>
      <img v-else-if="src" :src="src"/>
    </slot>
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
        color: this.textColor ? this.computeColor(this.textColor) : '#ffffff',
        backgroundColor: this.colorComputed,
        borderRadius: this.square ? 0 : '50%',
        fontSize: this.fontSize || '',
        width: this.sizeComputed,
        minWidth: this.sizeComputed, // We only define width because common use case would be flex row, for column we expect user to set appropriate styling externally.
        height: this.sizeComputed,
      }
    },
  },
}
</script>

<style lang="scss">
.va-avatar {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  vertical-align: middle;

  img, svg {
    border-radius: inherit;
    display: inline-flex;
    height: inherit;
    width: inherit;
    margin: auto;
  }
}
</style>
