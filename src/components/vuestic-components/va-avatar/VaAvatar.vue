<template>
  <div class="va-avatar" ref="avatar" :style="computedStyle">
    <slot>
      <img v-if="src" :src="src"/>
      <va-icon v-else-if="icon" :name="icon"/>
    </slot>
  </div>
</template>

<script>
import { SizeMixin } from '../../../mixins/SizeMixin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'
import VaIcon from '../va-icon/VaIcon'

export default {
  name: 'va-avatar',
  mixins: [SizeMixin, ColorThemeMixin, ContextPluginMixin],
  components: {
    VaIcon,
  },
  props: {
    size: {
      type: [String, Number],
      default () {
        return getContextPropValue(this, 'size', 'medium')
      },
    },
    color: {
      type: String,
      default () {
        return getContextPropValue(this, 'color', 'info')
      },
    },
    textColor: {
      type: String,
      default () {
        return getContextPropValue(this, 'textColor', 'white')
      },
    },
    square: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'square', false)
      },
    },
    icon: {
      type: String,
      default () {
        return getContextPropValue(this, 'icon', '')
      },
    },
    src: {
      type: String, // NOTE: you may not need to use this value from the context config.
    },
    fontSize: {
      type: String,
      default () {
        return getContextPropValue(this, 'fontSize', '')
      },
    },
  },
  computed: {
    computedStyle () {
      return {
        color: this.textColor ? this.computeColor(this.textColor) : '#ffffff',
        backgroundColor: this.colorComputed,
        borderRadius: this.square ? 0 : '50%',
        fontSize: this.fontSize,
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
