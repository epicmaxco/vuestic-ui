<template>
  <component
    :is="computedTag"
    class="va-icon"
    :class="computedClass"
    :style="computedStyle"
    aria-hidden="true"
    notranslate
    v-on="$listeners"
  >
    <slot>{{ computedContent }}</slot>
  </component>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { makeContextablePropsMixin } from './../../context-test/context-provide/ContextPlugin'
import vaIconMixin from './vaIconMixin'

const iconContextMixin = makeContextablePropsMixin({
  font: {
    type: String,
    default: 'md',
  },
  config: {
    type: Object,
    default: () => {},
  },
  tag: {
    type: String,
    default: 'i',
  },
  name: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: 'medium',
  },
  color: {
    type: String,
    default: '',
  },
  rotation: {
    type: [String, Number],
    default: '',
  },
})

export default {
  name: 'VaIcon',
  mixins: [ColorThemeMixin, SizeMixin, iconContextMixin, vaIconMixin],
  computed: {
    icon () {
      return this.getIcon()
    },
    computedTag () {
      return (this.icon && this.icon.component) || this.c_tag
    },
    computedClass () {
      return (this.icon && this.icon.iconClass) || ''
    },
    hasClickListener () {
      return this.$listeners && this.$listeners.click
    },
    cursorStyle () {
      return { cursor: this.hasClickListener ? 'pointer' : null }
    },
    rotateStyle () {
      return { transform: 'rotate(' + this.c_rotation + 'deg)' }
    },
    fontSizeStyle () {
      return { fontSize: this.iconSizeComputed }
    },
    colorStyle () {
      return { color: this.c_color ? this.colorComputed : null }
    },
    computedStyle () {
      return {
        ...this.cursorStyle,
        ...this.rotateStyle,
        ...this.fontSizeStyle,
        ...this.colorStyle,
      }
    },
    computedContent () {
      return this.icon && this.icon.content
    },
  },
}
</script>

<style lang="scss">
.va-icon {
  vertical-align: middle;
  user-select: none;
}
</style>
