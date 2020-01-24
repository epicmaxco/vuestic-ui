<template>
  <component
    :is="tag"
    class="va-icon"
    :class="computedClass"
    :style="computedStyle"
    aria-hidden="true"
    notranslate
  >
    <slot>{{ computedContent }}</slot>
  </component>
</template>

<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { getIcon } from './va-icon-service'
import { makeContextablePropsMixin } from './../../context-test/context-provide/ContextPlugin'

const iconContextMixin = makeContextablePropsMixin({
  tag: {
    type: String,
    default: 'i',
  },
  name: {
    type: String,
    default: '',
  },
  font: {
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
  mixins: [ColorThemeMixin, SizeMixin, iconContextMixin],
  computed: {
    icon () {
      return getIcon(this.name, this.font)
    },
    computedClass () {
      let iconClass = (this.icon && this.icon.iconClass) || ''
      return iconClass
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
}
</style>
